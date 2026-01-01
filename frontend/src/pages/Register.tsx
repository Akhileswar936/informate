import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_BASE_URL = "https://informate-backend.onrender.com";
const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [field, setField] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [re_password, setRe_password] = useState<string>('');

  const navigate = useNavigate();

  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/user/register`, { name, email, username, field, password, re_password })
      .then((res) => {
        if (res.data.msg === 'Registration successful') {
           toast.success(res.data.msg);
          setTimeout(() => navigate("/login"), 1000);
        }
       
      })
      .catch((err) => toast.error(err.response?.data.msg));
  };

  return (
    <div className="bg-[url('/main.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        <h1 className="text-center text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm font-medium">
            Name
            <input
              type="text"
              className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setName(e.target.value)}
              
            />
          </label>
          <label className="flex flex-col text-sm font-medium">
            Email
            <input
              type="email"
              className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setEmail(e.target.value)}
              
            />
          </label>
          <label className="flex flex-col text-sm font-medium">
            Username
            <input
              type="text"
              className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setUsername(e.target.value)}
              
            />
          </label>
          <label className="flex flex-col text-sm font-medium">
            Field
            <select
              className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setField(e.target.value)} >
              <option value="">Select an option</option>
              <option value="agriculture">Agriculture</option>
              <option value="industry">Industry</option>
              <option value="it">IT</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
            </select>
          </label>
          <label className="flex flex-col text-sm font-medium">
            Password
            <input
              type="password"
              className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setPassword(e.target.value)}
              
            />
          </label>
          <label className="flex flex-col text-sm font-medium">
            Confirm Password
            <input
              type="password"
              className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setRe_password(e.target.value)}
              
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
          
        </form>
        <h4 className="text-center mt-4">
          Already have an account? 
          <Link to="/login" className="font-bold text-blue-600 ml-1">Login</Link>
        </h4>
      </div>
    </div>
  );
};

export default Register;
