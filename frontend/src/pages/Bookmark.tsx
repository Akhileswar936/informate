import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


interface FeedData {
  user_id: string;
  _id: string;
  username: string;
  field: string;
  title: string;
  info: string;
  image:string;
  createdAt: string;
}
const API_BASE_URL = "https://informate-backend.onrender.com";
const Bookmark = () => {
  const [allfeeds,setAllfeeds]=useState<FeedData[]>([])
  const [field,setField]=useState<string>('all');
  const token = localStorage.getItem("token");
  const filteredFeeds = field === 'all' 
    ? allfeeds 
    : allfeeds.filter((feed) => feed.field.toLowerCase() === field.toLowerCase());
  const fetchData = () => {
    axios
      .get(`${API_BASE_URL}/feed/bookmark`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>{
      setAllfeeds(res.data.bookmarks);
       } )
      .catch((err) => toast.error(err.response.data.msg));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const deleteFeed = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/feed/bookmark/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.msg === "sucessfully deleted") {
            toast.info(res.data.msg);
          setAllfeeds((prev) => prev.filter((item) => item._id !== id));
        }
      })
      .catch((err) =>  toast.info(err));
  };

  return (
    <>
      <Navbar />
      <div className="bg-blue-300 min-h-screen w-full p-4">
           <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between p-2 bg-white/40 rounded m-2">
               <div>
                  <h1 className="font-bold">Bookmarks: {filteredFeeds.length}</h1>
               </div>
               <div>
                    <select className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400" onChange={(e)=>setField(e.target.value)}>
                        <option value="all">All</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="industry">Industry</option>
                        <option value="it">IT</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="finance">Finance</option>
                    </select>
               </div>
         </div>
         {filteredFeeds.length>0?
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFeeds.map((feed) => (
              <div
                key={feed._id}
                className="bg-white border border-gray-300 rounded-md shadow-sm p-4 w-full shadow-md
                             hover:shadow-xl hover:scale-[1.02] transition-all duration-300 "
              >
                <div className="flex justify-between items-center mb-2">
                  <Link to={`/userfeeds/${feed.user_id}`}>
                      <div className="flex items-center justify-center gap-2">
                      
                              <div>
                                  <img src={feed?.image || "/main.jpg"} alt="img"  className="w-[40px] h-[40px] rounded-[50%]"/>
                              </div>
                              <div>
                                  <h1 className="font-bold text-sm md:text-base">{feed.username}</h1>
                                  <h1 className="font-bold text-sm md:text-base capitalize">{feed.field}</h1>
                              </div>
                        
                        </div>
                </Link>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                    onClick={() => deleteFeed(feed._id)}
                  >
                    Delete
                  </button>
                </div>
                <h2 className="font-semibold text-lg capitalize mb-2">{feed.title}</h2>
                <p className="text-sm md:text-base leading-5 break-words">{feed.info}</p>
                <div className="flex justify-end border-t pt-2 mt-2">
                  <p className="text-xs md:text-sm">{new Date(feed.createdAt).toDateString()}</p>
                </div>
              </div>
            ))}
          </div>
         :(
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">No Bookmarks Available</h1>
            <p className="text-gray-500">Try changing the filter</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmark;
