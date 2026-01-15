import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
interface FeedData {
  user_id: string;
  _id: string;
  username: string;
  field: string;
  title: string;
  info: string;
  image: string;
  createdAt: string;
}

const API_BASE_URL = "https://informate-backend.onrender.com";

const Feed = () => {
  const [allfeeds, setAllfeeds] = useState<FeedData[]>([]);
  const [val,setVal]=useState<string>("explore");
  const [field, setField] = useState("all");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const filteredFeeds =
    field === "all"
      ? allfeeds
      : allfeeds.filter(
          (feed) => feed.field.toLowerCase() === field.toLowerCase()
        );
        
  const fetchnonconnectionData = () => {
    axios
      .get(`${API_BASE_URL}/feed/feeds/nonconnections`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAllfeeds(res.data.feeds))
      .catch((err) =>
        toast.error(err.response?.data?.msg || "Failed to load feeds")
      );
  };
const fetchconnectionData = () => {
    axios
      .get(`${API_BASE_URL}/feed/feeds/connections`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAllfeeds(res.data.feeds))
      .catch((err) =>
        toast.error(err.response?.data?.msg || "Failed to load feeds")
      );
  };

  useEffect(() => {
    fetchnonconnectionData();
     }, []);
      useEffect(() => {
      if (val === "explore") {
        fetchnonconnectionData();
      } else {
        fetchconnectionData();
      }
    }, [val]);


  const handlebookmark = (id: string) => {
    axios
      .post(
        `${API_BASE_URL}/feed/bookmark/add/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.msg === "sucessfully added") {
          toast.success(res.data.msg);
          setTimeout(() => navigate("/bookmark"), 1000);
        } 
      })
      .catch((err) =>{
        if(err.response.data.msg==="Already bookmarked")
        {
             toast.warning("Already bookmarked");
             return;
        }
        toast.error(err.response?.data?.msg || "Bookmark failed")
   });
  };

  return (
    <>
      <Navbar />
      <div className="bg-blue-400 w-full min-h-screen p-4">
  

        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 p-2 bg-white/40 rounded m-2">
          <h1 className="font-bold">Feeds: {filteredFeeds.length}</h1>
          <select
            className="border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
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
       <div className="flex justify-center m-2">
          <button
            className={`py-2 px-4 mr-2 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 
                        ${val === "following" ? "bg-green-600 text-white" : "bg-white"}`} onClick={() => setVal("following")}>
            Following
          </button>

          <button
            className={`py-2 px-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300
              ${val === "explore" ? "bg-green-600 text-white" : "bg-white"}`} onClick={() => setVal("explore")}>
              Explore
          </button>
       </div>

        {filteredFeeds.length ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFeeds.map((feed) => (
              <div
                key={feed._id}
                className="bg-white border rounded-md shadow-sm p-4 shadow-md
                             hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-2">
                   <Link to={`/userfeeds/${feed.user_id}`}>
                        <div className="flex items-center  gap-2">
                                <img   src={feed?.image || "/main.webp"}
                                alt="img"
                                className="w-10 h-10 rounded-full"
                                  />
                              <div>
                                  <h1 className="font-bold text-sm">{feed.username}</h1>
                                  <h1 className="text-sm capitalize">{feed.field}</h1>
                              </div>
                          </div>
                   </Link>
                </div>

                <h2 className="font-semibold text-lg capitalize mt-2 mb-2 line-clamp-2">
                  {feed.title}
                </h2>
                <p className="text-sm md:text-base leading-5 break-words">{feed.info}</p>

                <div className="flex justify-between items-center border-t pt-3 mt-3">
                  <button
                    className="text-gray-700 hover:text-blue-600 text-xl p-2 hover:bg-blue-50 rounded-lg transition"
                    onClick={() => handlebookmark(feed._id)}
                  >
                    <FaBookmark />
                  </button>
                  <p className="text-xs text-gray-600">
                    {new Date(feed.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold text-gray-700">
              No feeds Available
            </h1>
            <p className="text-gray-500">Try changing the filter</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Feed;
