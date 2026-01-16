import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_BASE_URL = "https://informate-backend.onrender.com";
const Updatepass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const navigate = useNavigate();
  
  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${API_BASE_URL}/user/set`, {
        email,
        otp,
        password,
        re_password,
      })
      .then((res) => {
        if (res.data.msg === "Password updated successfully") {
            toast.success("Password updated successfully")
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((err) => {
        toast.info(err.response?.data.msg);
      });
  };

  return (
    <div className="w-full min-h-screen bg-[url('/main.webp')] bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white p-4 rounded shadow-md">
        <h1 className="text-center font-bold text-lg mb-3">Update Password</h1>

        <form onSubmit={handlesubmit} className="space-y-3">
          <label className="block">
            <span className="text-sm">Enter email</span>
            <input
              type="email"
              className="border w-full outline-none px-2 py-1 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm">Enter OTP sent to your email</span>
            <input
              type="text"
              className="border w-full outline-none px-2 py-1 rounded"
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm">Enter new password</span>
            <input
              type="password"
              className="border w-full outline-none px-2 py-1 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm">Confirm password</span>
            <input
              type="password"
              className="border w-full outline-none px-2 py-1 rounded"
              onChange={(e) => setRe_password(e.target.value)}
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

export default Updatepass;
