import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import axios from "axios"
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
interface Info
{
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

    <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-3 sm:p-6">

       <div>
           <h1 className="font-semibold text-lg sm:text-xl   text-white m-2">Requests: {requetsUsers.length} </h1>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {requetsUsers.map((user)=>(
                         <div
                        key={user._id}
                        className="flex flex-col md:flex-row md:justify-between items-center bg-white rounded-xl p-4 shadow-md
                                    hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                        <div className="flex gap-3 items-center">
                            <img
                            src={user?.image || "/main.webp"}
                            alt="profile"
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                            />

                            <div>
                            <h4 className="font-semibold text-gray-800">
                                {user.username}
                            </h4>
                            <p className="text-sm capitalize text-blue-600">
                                {user.field}
                            </p>
                            </div>
                        </div>

                           <div className="flex gap-2">
                               <button className="text-green-600 hover:scale-110 transition" onClick={()=>requestaccept(user._id)}>
                               <FaCheckCircle />Accept
                              </button>

                                <button className="text-red-600 hover:scale-110 transition" onClick={()=>requestreject(user._id)}>
                                    <FaTimesCircle />Reject 
                                </button>
                           </div>
                </div>   
               ))}
           </div>
       </div>
      <h1 className="text-lg sm:text-xl font-bold text-white  m-2">
        Connect With Others
      </h1>

      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 p-2 bg-white/80 rounded-xl shadow-md mb-2">
        <h1 className="font-semibold text-md  text-blue-700">
          Connections
        </h1>

        <select
          className="border border-blue-300 rounded-lg px-3 py-2 outline-none
                     focus:ring-2 focus:ring-blue-500 transition"
          onChange={(e) => setField(e.target.value)}
        >
          <option value="all">All</option>
          <option value="agriculture">Agriculture</option>
          <option value="industry">Industry</option>
          <option value="it">IT</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      {filterconnects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterconnects.map((user) => (
            <div
              key={user._id}
              className="flex flex-col md:flex-row md:justify-between items-center bg-white rounded-xl p-4 shadow-md
                         hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <Link to={`/userfeeds/${user._id}`}>
                    
                  <div className="flex gap-3 items-center">
                    <img
                      src={user?.image || "/main.webp"}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                    />

                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {user.username}
                      </h4>
                      <p className="text-sm capitalize text-blue-600">
                        {user.field}
                      </p>
                    </div>
                  </div>

              </Link>

              <button
                className="bg-blue-500 text-white px-4 py-1.5 rounded-lg
                           hover:bg-blue-600 active:scale-40 transition-all" 
                           onClick={()=>requetsSent(user._id)}>
                Connect
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-2">
          <h1 className="text-2xl font-semibold text-white">
            No Connections Available
          </h1>
          <p className="text-blue-100 mt-2">
            Try changing the filter
          </p>
        </div>
      )}
    </div>
  </>
)};

export default Connect
