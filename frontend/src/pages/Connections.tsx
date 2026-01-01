import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
interface Info {
  _id: string;
  name: string;
  email: string;
  username: string;
  field: string;
  password: string;
  image: string;
  bookmark: [];
  connections: [];
}

const API_BASE_URL = "https://informate-backend.onrender.com";

const Connections = () => {
  const [info, setInfo] = useState<Info[]>([]);
  const token = localStorage.getItem("token");

  const fechusers = () => {
    axios
      .get(`${API_BASE_URL}/user/connect/connections`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInfo(res.data.users);
      })
      .catch((err) => {
        toast.error(err.response?.data?.msg || "Internal server error");
      });
  };

  useEffect(() => {
    fechusers();
  }, []);
  const removeconnection=(id:string)=>{
    axios.delete(`${API_BASE_URL}/user/connection/del/${id}`, {headers: { Authorization: `Bearer ${token}` }})
    .then((res)=>{
        if(res.data.msg==='delete connection sucessfully')
        {
            toast.info(res.data.msg)
            setInfo(prev=>prev.filter(user=>user._id!==id));
        }
    })
    .catch((err) => {
        toast.error(err.response?.data?.msg || "Internal server error");
      });
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-white/80 rounded-xl p-4 shadow mb-6">
            <div>
              <h1 className="text-2xl font-bold text-blue-700">
                Your Connections
              </h1>
              <p className="text-sm text-gray-600">
                People you are currently connected with
              </p>
            </div>
            <div className="text-lg font-semibold text-blue-600">
              Total: {info.length}
            </div>
          </div>

          {info.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {info.map((user) => (
                <div
                  key={user._id}
                  className="flex justify-between items-center bg-white rounded-xl p-4 shadow-md
                             hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <Link to={`/userfeeds/${user._id}`}>

                       <div className="flex gap-3 items-center">
                        <img
                            src={user?.image || "/main.jpg"}
                          alt="profile"
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                        />

                        <div>
                          <h1 className="font-semibold text-gray-800">
                            {user.username}
                          </h1>
                          <p className="text-sm capitalize text-blue-600">
                            {user.field}
                          </p>
                        </div>
                      </div>
                  </Link>

                  <button
                    className="bg-red-500 text-white px-4 py-1.5 rounded-lg
                               hover:bg-red-600 active:scale-95 transition-all" onClick={()=>removeconnection(user._id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h1 className="text-2xl font-semibold text-white">
                No Connections Available
              </h1>
              <p className="text-blue-100 mt-2">
                Start connecting with people to see them here
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Connections;
