import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_BASE_URL = "http://localhost:9999";
const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/user/login`, { email, password })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          toast.success('Login successfully');
          setTimeout(() => navigate("/home"),1000);
        }
      })
      .catch((err) => toast.error(err.response?.data.msg));
  };

  return (
    <div className="bg-[url('/main.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm font-medium">
            Enter email
            <input
              type="email"
              className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setEmail(e.target.value)}
              
            />
          </label>
          <label className="flex flex-col text-sm font-medium">
            Enter password
            <input
              type="password"
              className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setPassword(e.target.value)}
              
            />
          </label>
          <Link to='/forgot'>
            <p className="text-end text-gray-600 text-sm cursor-pointer">Forgot password?</p>
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
        <h4 className="text-center mt-4">
          Create an account? 
          <Link to="/register" className="font-bold text-blue-600 ml-1">Register</Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
