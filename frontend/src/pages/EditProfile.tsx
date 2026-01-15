

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_BASE_URL = "https://informate-backend.onrender.com";
const EditProfile = () => {
      const [name, setName] = useState<string>('');
      const [username, setUsername] = useState<string>('');
      const [img,setImg]=useState<File|null>(null);
      const token = localStorage.getItem("token");
      const navigate=useNavigate();

     const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                    setImg(file);
                    }
                };
     const submithandler = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if(!img || !name || !username)
            {
                toast.error('Please fill all fields and select an image');
                 return;
            }
            const formdata=new FormData();
            formdata.append('image',img);
            formdata.append('name',name);
            formdata.append('username',username);
            axios.post(`${API_BASE_URL}/user/update`,formdata,{headers:{Authorization:`Bearer ${token}`}})
            .then((res)=>{
                  if(res.data.msg=='updated')
                 {
                    toast.success('data updated sucessfully..');
                    setTimeout(()=>{
                          navigate('/profile')
                    },300)
                 }
            })
            .catch((err)=>{
                toast.error(err.response?.data?.msg || 'Update failed');
            })
            };

     

  return (
    <>
       <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400  min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-center text-2xl font-bold mb-4">Update Profile</h1>
                <form onSubmit={submithandler}>
                     <label className="flex flex-col text-sm font-medium">
                        Name
                        <input
                        type="text"
                        className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={e => setName(e.target.value)}
                        
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
                    <label className="flex flex-col text-sm font-medium my-2" >
                        Profile
                        <input type="file" accept="image/*"  
                        className="border rounded px-2 py-1 mt-1 outline-none focus:ring-2 focus:ring-blue-400" onChange={setData} />
                    </label>
                    <button type="submit" className="bg-blue-300 w-[100%] p-2">Submit</button>
                </form>
            </div>
       </div>
    </>
  )
}

export default EditProfile
