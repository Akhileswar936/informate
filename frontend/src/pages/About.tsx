import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_BASE_URL = "http://localhost:9999";
const About = () => {
  const [email, setEmail] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(
        `${API_BASE_URL}/feed/feedback`,
        { email, feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.msg === "succefully feedback is added") {
          toast.success(res.data.msg);
          setTimeout(() => {
            navigate("/home",{replace:true});
          }, 400);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  return (
    <>
      <Navbar />

      <div className="bg-blue-400 w-full min-h-screen py-4 text-white flex flex-col md:flex-row items-center md:justify-center gap-10 px-4 md:px-0">

        <div className="text-center md:text-left max-w-sm">
          <h1 className="text-3xl font-bold">Informate</h1>
          <h2 className="text-xl mt-1">Share your thoughts and experience</h2>
          <h2 className="lowercase text-sm mt-2">
            For any query connect: ar9542550@gmail.com
          </h2>
        </div>

    
        <div className="w-full max-w-xs md:max-w-sm bg-[rgba(255,255,255,0.3)] p-4 rounded shadow-md
                             hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
          <h1 className="text-center text-lg font-semibold mb-2">
            Share Your Experience
          </h1>

          <form onSubmit={handlesubmit} className="space-y-3">

            <label className="block">
              <span className="text-sm">Enter email:</span>
              <input
                type="email"
                className="border w-full outline-none px-2 py-1 text-black rounded focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm">Enter a query:</span>
              <textarea
                className="border w-full outline-none resize-none px-2 py-1 h-20 text-black rounded focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </label>

            <button
              type="submit"
              className="border w-full bg-white text-black py-1 rounded font-medium hover:bg-gray-200 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
