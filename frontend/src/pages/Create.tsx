import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
const API_BASE_URL = "https://informate-backend.onrender.com";
const Create: React.FC = () => {
  const [title, setIstitle] = useState('');
  const [info, setIsinfo] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(
      `${API_BASE_URL}/feed/create`,
      { title, info },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      toast.success(res.data.msg);
      if (res.data.msg === 'sucessfully created') {
        setTimeout(() => navigate("/home"), 1000);
      }
    })
    .catch((err) =>{
        toast.info(err.response?.data.msg)
  });
  };

  return (
    <div className="w-full min-h-screen bg-[url('/main.webp')] bg-center bg-cover bg-no-repeat flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-4">Create New Post</h1>
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm font-medium">
            Enter a title
            <input
              type="text"
              className="border-b rounded px-2 py-1 mt-1 outline-none"
              maxLength={30}
              onChange={(e) => setIstitle(e.target.value)}
              
            />
          </label>
          <label className="flex flex-col text-sm font-medium">
            Enter info
            <textarea
              className="border-b rounded px-2 py-1 mt-1 outline-none resize-none h-32 "
              onChange={(e) => setIsinfo(e.target.value)}
              
            ></textarea>
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
          >
              Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
