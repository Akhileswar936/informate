import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-[rgba(255,255,255,0.3)] py-2 text-white capitalize text-black">
        <div className="flex justify-between items-center px-4 md:px-8">
          <h2 className="text-xl font-semibold">Informate</h2>

          <button 
            className="md:hidden text-3xl" 
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>

          <ul className="hidden md:flex gap-6">
            <Link to="/home"><li className="hover:text-gray-300">Home</li></Link>
            <Link to="/feed"><li className="hover:text-gray-300">Feed</li></Link>
            <Link to="/bookmark"><li className="hover:text-gray-300">Bookmarks</li></Link>
            <Link to="/connects"><li className="hover:text-gray-300">Connect</li></Link>
            <Link to="/profile"><li className="hover:text-gray-300">Profile</li></Link>
            <Link to="/about"><li className="hover:text-gray-300">About</li></Link>
            <Link to="/logout"><li className="hover:text-gray-300">Logout</li></Link>
          </ul>
        </div>

        {open && (
          <ul className="flex flex-col items-center gap-4 pt-4 pb-4 md:hidden bg-black/40 backdrop-blur">
            <Link to="/home"><li>Home</li></Link>
            <Link to="/feed"><li>Feed</li></Link>
            <Link to="/bookmark"><li>Bookmarks</li></Link>
            <Link to="/connects"><li>Connect</li></Link>
            <Link to="/profile"><li>Profile</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/logout"><li>Logout</li></Link>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
