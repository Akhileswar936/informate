import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

interface FeedData {
  user_id: string;
  _id: string;
  username: string;
  field: string;
  title: string;
  info: string;
  image:string
  createdAt: string;
}


const API_BASE_URL = "https://informate-backend.onrender.com";
const Home = () => {
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  const fetchFeeds = () => {
    axios
      .get(`${API_BASE_URL}/feed/feeds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFeeds(res.data.feeds))
      .catch((err) => toast.info(err.response?.data.msg));
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const deletePost = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/feed/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.msg === "delete succefully") {
            toast.info(res.data.msg)
          setTimeout(() => fetchFeeds(), 1000);
        }
      })
      .catch((err) =>  toast.info(err));
  };

  const handleBookmark = (id: string) => {
    axios
      .post(
        `${API_BASE_URL}/feed/bookmark/add/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.msg === "sucessfully added") {
          toast.success(res.data.msg)
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
      <div className="bg-teal-500 min-h-screen w-full p-4">
        <div className="text-center text-lg p-4 mb-6 rounded-md bg-white/30">
          <h1 className="font-semibold">Welcome to Informate</h1>
          <p>Share your thoughts and experience</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="font-bold text-center md:text-left">
            <h2 className="capitalize">Feeds:{feeds.length}</h2>
          </div>
          <div>
            <Link to="/create">
              <button className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 transition">
                Create+
              </button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {feeds.map((feed) => (
            <div
              key={feed._id}
              className="bg-white border border-gray-300 rounded-md  p-4 w-full shadow-md
                             hover:shadow-xl hover:scale-[1.02] transition-all duration-300 break-words "
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
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded active:scale-95 transition-all"
                  onClick={() => deletePost(feed._id)}
                >
                  Delete
                </button>
              </div>

              <h2 className="font-semibold text-lg capitalize mb-2">{feed.title}</h2>
              <p className="text-sm md:text-base leading-5 break-words">{feed.info}</p>

              <div className="flex justify-between items-center border-t pt-2 mt-2">
                <button
                  className="text-gray-700 hover:text-blue-900 text-xl px-2"
                  onClick={() => handleBookmark(feed._id)}
                >
                  <FaBookmark />
                </button>
                <p className="text-xs md:text-sm">
                  {new Date(feed.createdAt).toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
