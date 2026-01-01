import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="bg-[url('/main.jpg')]  min-h-screen flex flex-col justify-center items-center text-white text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Informate</h1>
      <p className="text-lg md:text-2xl mb-6">Share your thoughts and experience</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/register">
          <button className="bg-gray-800 hover:bg-gray-700 transition text-white font-semibold py-2 px-6 rounded">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-gray-800 hover:bg-gray-700 transition text-white font-semibold py-2 px-6 rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
