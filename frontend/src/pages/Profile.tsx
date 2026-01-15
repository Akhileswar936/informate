import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FaUserEdit, FaUser, FaEnvelope, FaBriefcase, FaUsers } from "react-icons/fa";
interface Info
{
     name:string,
     email:string,
     username:string,
     field:string,
     password:string,
     image:string,
     bookmark:[],
     connections:[]
}
const API_BASE_URL = "https://informate-backend.onrender.com";
const Profile = () => {
 const [info, setInfo] = useState<Info>();
  const token = localStorage.getItem("token");
  useEffect(()=>{
      fetchUserInfo();
      
  },[])
  const fetchUserInfo = () => {
    axios
      .get(`${API_BASE_URL}/user/userinfo`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setInfo(res.data.user))
      .catch((err) => toast.info(err.response?.data.msg));
  };
  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen bg-blue-400 flex justify-center items-center p-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl  w-full max-w-md p-6 shadow-md
                             hover:shadow-xl hover:scale-[1.02] transition-all duration-300">

          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 shadow-sm">
              <img src={info?.image || "/main.webp"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-xl font-bold mt-3 text-gray-800">
              {info?.name}
            </h1>
            <p className="text-sm text-gray-500">@{info?.username}</p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
             <Link to={"/connections"}>
                   <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
                    <FaUsers className="text-blue-500" />
                    <span className="font-semibold">Connections:</span>
                    <span>{info?.connections.length}</span>
                   </div>
             </Link>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
              <FaBriefcase className="text-indigo-500" />
              <span>{info?.field}</span>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
              <FaEnvelope className="text-red-500" />
              <span>{info?.email}</span>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
              <FaUser className="text-green-500" />
              <span>{info?.username}</span>
            </div>
          </div>

          <Link to="/editprofile">
            <button className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md">
              <FaUserEdit />
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
