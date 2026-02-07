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

    <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-2 sm:p-4 lg:p-6">
       <div className="mb-6 lg:mb-8">
           <h1 className="font-semibold text-lg sm:text-xl md:text-2xl text-white mb-4 sm:mb-6">
             Requests: {requetsUsers.length}
           </h1>
           {requetsUsers.length > 0 && (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
               {requetsUsers.map((user)=>(
                         <div
                        key={user._id}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                        <div className="flex gap-3 items-center mb-3 sm:mb-0">
                            <img
                            src={user?.image || "/main.webp"}
                            alt="profile"
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-3 border-blue-400"
                            />

                            <div>
                            <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                                {user.username}
                            </h4>
                            <p className="text-sm capitalize text-blue-600 font-medium">
                                {user.field}
                            </p>
                            </div>
                        </div>

                           <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end pt-2 sm:pt-0">
                               <button 
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center flex-1 sm:flex-none min-h-[44px]"
                                onClick={()=>requestaccept(user._id)}
                               >
                                <FaCheckCircle className="w-5 h-5 mr-1 sm:mr-2" />
                                Accept
                              </button>

                                <button 
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center flex-1 sm:flex-none min-h-[44px]"
                                onClick={()=>requestreject(user._id)}
                                >
                                    <FaTimesCircle className="w-5 h-5 mr-1 sm:mr-2" />
                                    Reject
                                </button>
                           </div>
                </div>   
               ))}
           </div>
           )}
       </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
        Connect With Others
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl mb-6">
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-blue-800 flex-1">
          Available Connections
        </h2>

        <select
          className="w-full sm:w-auto border-2 border-blue-300 rounded-xl px-4 py-3 text-base font-semibold outline-none bg-white shadow-lg hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 transition-all"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          {filterconnects.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
            >
              <Link to={`/userfeeds/${user._id}`} className="flex-1 mb-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={user?.image || "/main.webp"}
                      alt="profile"
                      className="w-16 h-16 rounded-full object-cover border-3 border-blue-400 flex-shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-800 text-lg truncate">
                        {user.username}
                      </h4>
                      <p className="text-sm capitalize text-blue-600 font-semibold mt-1">
                        {user.field}
                      </p>
                    </div>
                  </div>
              </Link>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 h-[52px] min-h-[52px]"
                onClick={()=>requetsSent(user._id)}
              >
                
                Connect
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            No Connections Available
          </h1>
          <p className="text-xl text-blue-100 font-semibold max-w-md mx-auto">
            Try changing the field filter above
          </p>
        </div>
      )}
    </div>
  </>
  );
};

export default Connect;