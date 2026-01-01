import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUserCircle,
  FaEnvelope,
  FaBriefcase,
  FaBookmark,
} from "react-icons/fa";
import { toast } from "react-toastify";

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

interface Info {
  name: string;
  email: string;
  username: string;
  field: string;
  image: string;
  bookmark: [];
  connections: [];
}

const API_BASE_URL = "http://localhost:9999";

const Userfeeds = () => {
  const { id } = useParams();
  const [info, setInfo] = useState<Info>();
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/feed/userfeeds/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInfo(res.data.user);
        setFeeds(res.data.feeds);
      })
      .catch(() => toast.error("Failed to load profile"));
  }, [id]);

  const handleBookmark = (id: string) => {
    axios
      .post(
        `${API_BASE_URL}/feed/bookmark/add/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Bookmarked");
        setTimeout(() => navigate("/bookmark"), 800);
      })
      .catch((err) => {
        if (err.response?.data?.msg === "Already bookmarked") {
          toast.warning("Already bookmarked");
          return;
        }
        toast.error("Bookmark failed");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-500 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white/90 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 shadow-sm">
            <img
                 src={info?.image || "/main.jpg"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
              <FaUserCircle className="text-indigo-500 text-lg" />
              <span className="font-semibold">{info?.name}</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
              <FaUser className="text-green-600 text-lg" />
              <span>{info?.username}</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
              <FaBriefcase className="text-blue-600 text-lg" />
              <span className="capitalize">{info?.field}</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
              <FaEnvelope className="text-red-500 text-lg" />
              <span className="truncate">{info?.email}</span>
            </div>
          </div>
        </div>

        <h2 className="mt-10 mb-4 text-xl font-bold text-gray-800">
          User Feeds
        </h2>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {feeds.map((feed) => (
            <div
              key={feed._id}
              className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md hover:scale-[1.02] transition-all duration-300 w-full"
            >
              <div className="flex items-center gap-3 mb-3">
                <img  src={feed?.image || "/main.jpg"}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">{feed.username}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {feed.field}
                  </p>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {feed.title}
              </h3>

              <p className="text-sm text-gray-700 line-clamp-4">
                {feed.info}
              </p>

              <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <button
                  onClick={() => handleBookmark(feed._id)}
                  className="text-xl text-gray-600 hover:text-indigo-600 transition"
                >
                  <FaBookmark />
                </button>
                <span className="text-xs text-gray-500">
                  {new Date(feed.createdAt).toDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userfeeds;
