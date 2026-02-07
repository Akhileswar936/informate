import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import axios from "axios"
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Info {
     _id:string,
     name:string,
     email:string,
     username:string,
     field:string,
     password:string,
     image:string,
     bookmark?:[],
     connections:[]
}

const API_BASE_URL = "https://informate-backend.onrender.com";

const Connect = () => {
  const [field,setField]=useState<string>('all');
  const [connects,setconnects]=useState<Info[]>([]);
  const [requetsUsers,setRequestUsers]=useState<Info[]>([]);
  const token = localStorage.getItem("token");
  const filterconnects=field=='all'?connects:connects.filter((user)=>user.field===field);

  const fetchConnects=()=>{
      axios.get(`${API_BASE_URL}/user/connectsusers`,{headers: { Authorization: `Bearer ${token}` }})
      .then(res=>{
          setconnects(res.data.users);
      })
      .catch((err)=>{
         toast.error(err.response.data.msg||'Internal server error')
      })
  }

  const requestDisplay=()=>{
     axios.get(`${API_BASE_URL}/user/connects/requestdisplay`,{headers: { Authorization: `Bearer ${token}` }})
      .then(res=>{
          setRequestUsers(res.data.users);
      })
      .catch((err)=>{
         toast.error(err.response.data.msg||'Internal server error')
      })
  }

    useEffect(()=>{
        fetchConnects();
        requestDisplay();
    },[])

  const requetsSent=(id:string)=>{
    axios.post(`${API_BASE_URL}/user/connects/request/${id}`,{},{headers: { Authorization: `Bearer ${token}` }})
    .then((res)=>{
        if(res.data.msg==="request sent")
        {
            toast.success(res.data.msg)
            setTimeout(()=>{
                   fetchConnects();
            },100)
        }
    })
    .catch((err)=>{
         toast.error(err.response.data.msg)
     })   
   }

  const requestaccept=(id:string)=>{
     axios.post(`${API_BASE_URL}/user/connects/requestaccept/${id}`,{},{headers: { Authorization: `Bearer ${token}` }})
     .then((res)=>{
          if(res.data.msg==="request accept")
          {
                toast.success(res.data.msg)
                setTimeout(()=>{
                        requestDisplay();
                        fetchConnects();
                },100)
          }
     })
     .catch((err)=>{
         toast.error(err.response.data.msg)
     })
  }

  const requestreject=(id:string)=>{
    axios.post(`${API_BASE_URL}/user/connects/requestreject/${id}`,{},{headers: { Authorization: `Bearer ${token}` }})
     .then((res)=>{
           if(res.data.msg==="request reject")
          {
                toast.success(res.data.msg)
                setTimeout(()=>{
                        requestDisplay();
                        fetchConnects();
                },100)
          }
     })
     .catch((err)=>{
         toast.error(err.response.data.msg)
     })
  }

  return (
  <>
    <Navbar />

    <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-2 sm:p-4 lg:p-6 xl:p-8">
       <div className="mb-6 lg:mb-8">
           <h1 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-4 sm:mb-6 drop-shadow-md">
             Requests: {requetsUsers.length}
           </h1>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
               {requetsUsers.map((user)=>(
                         <div
                        key={user._id}
                        className="flex flex-col xs:flex-row sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/50"
                        >
                        <div className="flex gap-3 sm:gap-4 items-center mb-3 xs:mb-0 w-full xs:w-auto">
                            <img
                            src={user?.image || "/main.webp"}
                            alt="profile"
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-3 border-blue-400 shadow-md flex-shrink-0"
                            />

                            <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg truncate">
                                {user.username}
                            </h4>
                            <p className="text-xs sm:text-sm md:text-base capitalize text-blue-600 font-medium">
                                {user.field}
                            </p>
                            </div>
                        </div>

                           <div className="flex gap-2 w-full xs:w-auto justify-center xs:justify-end">
                               <button 
                                className="text-green-600 hover:text-green-700 hover:scale-110 active:scale-95 p-2 sm:p-3 rounded-xl bg-green-100/80 hover:bg-green-200/80 backdrop-blur-sm shadow-md transition-all duration-200 flex items-center justify-center flex-shrink-0"
                                onClick={()=>requestaccept(user._id)}
                               >
                               <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                              </button>

                                <button 
                                className="text-red-600 hover:text-red-700 hover:scale-110 active:scale-95 p-2 sm:p-3 rounded-xl bg-red-100/80 hover:bg-red-200/80 backdrop-blur-sm shadow-md transition-all duration-200 flex items-center justify-center flex-shrink-0"
                                onClick={()=>requestreject(user._id)}
                                >
                                    <FaTimesCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                           </div>
                </div>   
               ))}
           </div>
       </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl tracking-tight">
        Connect With Others
      </h1>

      <div className="flex flex-col sm:flex-row lg:flex-row xl:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl lg:shadow-2xl mb-6 lg:mb-8 border border-white/50">
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-800 tracking-wide flex-1">
          Available Connections
        </h2>

        <select
          className="w-full sm:w-auto border-2 border-blue-300/80 rounded-xl px-4 py-3 sm:py-3 lg:py-4 text-base sm:text-lg font-semibold outline-none bg-white/70 backdrop-blur-sm shadow-lg
                     hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 focus:shadow-xl transition-all duration-300"
          onChange={(e) => setField(e.target.value)}
        >
          <option value="all">All Fields</option>
          <option value="agriculture">Agriculture</option>
          <option value="industry">Industry</option>
          <option value="it">IT</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      {filterconnects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 pb-8">
          {filterconnects.map((user) => (
            <div
              key={user._id}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 border border-white/50 overflow-hidden"
            >
              <Link to={`/userfeeds/${user._id}`} className="block w-full h-full">
                  <div className="flex gap-3 sm:gap-4 items-center mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-blue-100/70 group-hover:border-blue-200/70 transition-colors">
                    <img
                      src={user?.image || "/main.webp"}
                      alt="profile"
                      className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full object-cover border-3 border-blue-400 shadow-lg flex-shrink-0 hover:scale-110 transition-transform duration-300"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base lg:text-lg truncate group-hover:text-blue-700 transition-colors">
                        {user.username}
                      </h4>
                      <p className="text-xs sm:text-sm lg:text-base capitalize text-blue-600 font-semibold mt-1">
                        {user.field}
                      </p>
                    </div>
                  </div>
              </Link>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl active:scale-95 active:shadow-md transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-blue-300/30 group-hover:scale-[1.02]"
                onClick={()=>requetsSent(user._id)}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h6m-6 0h6m0 0v6m0-6L9 9l6 6-6 6" />
                </svg>
                Connect
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 sm:py-28 lg:py-32 px-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-6 sm:mb-8 bg-white/60 rounded-2xl backdrop-blur-sm flex items-center justify-center shadow-xl">
            <svg className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 drop-shadow-2xl">
            No Connections Available
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 font-semibold max-w-md mx-auto leading-relaxed">
            Try changing the field filter above to discover professionals in your area of expertise
          </p>
        </div>
      )}
    </div>
  </>
)};

export default Connect;