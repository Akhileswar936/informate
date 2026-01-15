import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const API_BASE_URL = "https://informate-backend.onrender.com";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${API_BASE_URL}/user/forgot`, { email })
      .then((res) => {
        if (res.data.msg === "OTP sent successfully") {
          toast.success("Redirecting...");
          setTimeout(() => {
            navigate("/updatepass");
          }, 1000);
        } 
      })
      .catch((err) => {
        toast.info(err.response?.data.msg);
      });
  };

  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400  w-full min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white p-4 rounded shadow-md">
        <h1 className="text-center font-bold text-lg mb-3">Change Password</h1>

        <form onSubmit={handlesubmit} className="space-y-3">
          <label className="block">
            <span className="text-sm">Enter email</span>
            <input
              type="email"
              className="border w-full outline-none px-2 py-1 rounded focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="border w-full bg-gray-400 py-1 rounded font-medium hover:bg-gray-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
