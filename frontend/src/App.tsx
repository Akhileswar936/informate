import { BrowserRouter,Routes,Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Intro from "./pages/Intro"
import Forgot from "./pages/Forgot"
import Updatepass from "./pages/Updatepass"
import TokenExpirationTimer from "./pages/TokenExpirationTimer"
import Navbar from "./pages/Navbar"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Feed from "./pages/Feed"
import About from "./pages/About"
import Logout from "./pages/Logout"
import Bookmark from "./pages/Bookmark"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Connect from "./pages/Connect"
import Connections from "./pages/Connections"
import Userfeeds from "./pages/Userfeeds"

const App = () => {
  return (
     <>
         <BrowserRouter>
                <TokenExpirationTimer/>
                <ToastContainer  autoClose={500}/>
               <Routes>
                    <Route path="/" element={<Intro/>}/>
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot" element={<Forgot/>}/>
                    <Route path="/updatepass" element={<Updatepass/>} />
                    <Route path="/navbar" element={<Navbar/>} />
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/feed" element={<Feed/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/bookmark" element={<Bookmark/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/editprofile" element={<EditProfile/>}/>
                    <Route path="/connects" element={<Connect/>}/>
                    <Route path="/connections" element={<Connections/>}/>
                    <Route path="/userfeeds/:id" element={<Userfeeds/>} />
               </Routes>
         </BrowserRouter>
     </>
  )
}

export default App