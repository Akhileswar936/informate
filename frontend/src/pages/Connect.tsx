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

    <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 p-3 sm:p-5 lg:p-8">
       {/* REQUESTS SECTION */}
       <section className="mb-8 lg:mb-12">
           <h1 className="font-black text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6 lg:mb-8 drop-shadow-lg tracking-tight">
             Incoming Requests ({requetsUsers.length})
           </h1>
           
           {requetsUsers.length === 0 ? (
             <div className="text-center py-12 px-4 sm:px-8">
               <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-xl">
                 <FaCheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
               </div>
               <h3 className="text-2xl sm:text-3xl font-bold text-white/90 mb-3">No pending requests</h3>
               <p className="text-lg text-blue-100 font-medium max-w-sm mx-auto">You'll see connection requests here when professionals want to connect</p>
             </div>
           ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
               {requetsUsers.map((user)=>(
                         <article
                        key={user._id}
                        className="group bg-gradient-to-br from-white to-blue-50/70 backdrop-blur-sm rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 border border-white/50 hover:border-blue-200/50"
                        >
                          <div className="flex items-start gap-4 mb-5 sm:mb-6 pb-5 border-b border-blue-100/60">
                            <div className="flex-shrink-0">
                              <img
                              src={user?.image || "/main.webp"}
                              alt={user.username}
                              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-2xl object-cover border-4 border-white shadow-2xl ring-4 ring-blue-100/50 group-hover:ring-blue-200/70 transition-all"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="font-black text-gray-900 text-lg sm:text-xl lg:text-2xl truncate mb-1 group-hover:text-blue-700 transition-colors">
                                {user.username}
                              </h4>
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm sm:text-base font-bold rounded-full shadow-lg">
                                <span>{user.field}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button 
                             className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 px-6 rounded-2xl font-black text-base sm:text-lg shadow-2xl hover:shadow-3xl active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-3 h-[56px] min-h-[56px] border border-emerald-300/50 backdrop-blur-sm"
                             onClick={()=>requestaccept(user._id)}
                            >
                             <FaCheckCircle className="w-6 h-6" />
                             Accept Connection
                           </button>

                             <button 
                             className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white py-4 px-6 rounded-2xl font-black text-base sm:text-lg shadow-2xl hover:shadow-3xl active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-3 h-[56px] min-h-[56px] border border-rose-300/50 backdrop-blur-sm"
                             onClick={()=>requestreject(user._id)}
                             >
                                 <FaTimesCircle className="w-6 h-6" />
                                 Decline
                             </button>
                          </div>
                 </article>   
               ))}
           </div>
           )}
       </section>

      {/* CONNECTIONS SECTION */}
      <section>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text drop-shadow-2xl tracking-tight">
          Connect With Professionals
        </h1>

        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 lg:gap-6 p-6 lg:p-8 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl lg:shadow-3xl mb-8 lg:mb-12 border border-blue-200/60">
          <h2 className="font-black text-xl sm:text-2xl lg:text-3xl text-blue-900 tracking-wide flex-1">
            Browse by Expertise
          </h2>

          <select
            className="w-full lg:w-auto border-3 border-blue-300/70 rounded-2xl px-6 py-4 lg:py-4 text-lg font-bold outline-none bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/40 hover:shadow-2xl transition-all duration-300"
            onChange={(e) => setField(e.target.value)}
          >
            <option value="all">All Expertise Areas</option>
            <option value="agriculture">🌾 Agriculture</option>
            <option value="industry">🏭 Industry</option>
            <option value="it">💻 IT & Technology</option>
            <option value="healthcare">🏥 Healthcare</option>
            <option value="education">📚 Education</option>
            <option value="finance">💰 Finance</option>
          </select>
        </div>

        {filterconnects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 pb-12">
            {filterconnects.map((user) => (
              <article
                key={user._id}
                className="group bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-3 active:scale-[0.98] transition-all duration-500 border border-blue-100/70 hover:border-blue-300/80 overflow-hidden hover:bg-white/90"
              >
                <Link to={`/userfeeds/${user._id}`} className="block mb-6 lg:mb-8">
                    <div className="flex items-start gap-4 group-hover:gap-5 transition-all">
                      <div className="relative flex-shrink-0">
                        <img
                          src={user?.image || "/main.webp"}
                          alt={user.username}
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl object-cover border-4 border-white shadow-2xl ring-8 ring-blue-50/80 group-hover:ring-blue-200/90 transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white border-4 border-white">
                          <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 pt-2">
                        <h4 className="font-black text-2xl lg:text-3xl text-gray-900 mb-2 truncate group-hover:text-blue-700 transition-colors">
                          {user.username}
                        </h4>
                        <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl ring-2 ring-blue-200/50">
                          <span className="tracking-wide">{user.field}</span>
                        </div>
                      </div>
                    </div>
                </Link>

                <button
                  className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-700 text-white py-5 px-8 rounded-3xl font-black text-xl lg:text-2xl shadow-3xl hover:shadow-4xl active:scale-[0.97] transition-all duration-400 flex items-center justify-center gap-4 h-[68px] lg:h-[76px] min-h-[68px] border-2 border-indigo-300/60 backdrop-blur-xl ring-4 ring-indigo-200/50 hover:ring-indigo-300/70"
                  onClick={()=>requetsSent(user._id)}
                >
                  <svg className="w-7 h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h6m-6 0h6m0 0v6m0-6L9 9l6 6-6 6" />
                  </svg>
                  Send Connection Request
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 lg:py-32 px-6">
            <div className="w-28 h-28 lg:w-36 lg:h-36 mx-auto mb-8 bg-gradient-to-br from-white/60 to-blue-100/60 rounded-3xl backdrop-blur-xl flex items-center justify-center shadow-2xl border-4 border-white/70">
              <svg className="w-16 h-16 lg:w-20 lg:h-20 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl bg-gradient-to-r from-white to-blue-100 bg-clip-text">
              No Professionals Found
            </h1>
            <p className="text-2xl lg:text-3xl text-blue-50/90 font-bold max-w-2xl mx-auto leading-relaxed">
              Try switching the expertise filter above to discover connections in your field
            </p>
          </div>
        )}
      </section>
    </div>
  </>
  );
};

export default Connect;