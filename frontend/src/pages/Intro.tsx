import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Intro = () => {
  const titleText = "Welcome to Informate";
  const messageText = "Share your thoughts and experience";

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  useEffect(() => {
  axios.get("https://informate-backend.onrender.com/welcome");
}, []);
  useEffect(() => {
    let titleIndex = 0;
    let messageIndex = 0;

    const titleInterval = setInterval(() => {
      setTitle((prev) => prev + titleText[titleIndex]);
      titleIndex++;

      if (titleIndex === titleText.length) {
        clearInterval(titleInterval);

        const messageInterval = setInterval(() => {
          setMessage((prev) => prev + messageText[messageIndex]);
          messageIndex++;

          if (messageIndex === messageText.length) {
            clearInterval(messageInterval);

            setTimeout(() => setShowButtons(true), 500);
          }
        }, 60);
      }
    }, 80);

    return () => clearInterval(titleInterval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400 min-h-screen flex flex-col justify-center items-center text-white text-center px-4 space-y-6">

      <h1 className="text-3xl md:text-5xl font-bold min-h-[3rem]">
        {title}
        <span className="animate-pulse">|</span>
      </h1>

      <p className="text-lg md:text-2xl min-h-[2rem]">
        {message}
      </p>

      {showButtons && (
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
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
      )}

    </div>
  );
};

export default Intro;
