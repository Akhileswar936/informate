import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Intro = () => {
  const titleText = "Welcome to Informate";
  const messageText = "Share your thoughts and experience";

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const titleIndexRef = useRef(0);
  const messageIndexRef = useRef(0);


  useEffect(() => {
    axios.get("https://informate-backend.onrender.com/welcome").catch(() => {});
  }, []);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      if (titleIndexRef.current >= titleText.length) {
        clearInterval(titleInterval);

        const messageInterval = setInterval(() => {
          if (messageIndexRef.current >= messageText.length) {
            clearInterval(messageInterval);
            setTimeout(() => setShowButtons(true), 500);
            return;
          }

          setMessage(prev => prev + messageText[messageIndexRef.current]);
          messageIndexRef.current++;
        }, 60);

        return;
      }

      setTitle(prev => prev + titleText[titleIndexRef.current]);
      titleIndexRef.current++;
    }, 80);

    return () => clearInterval(titleInterval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400 min-h-screen flex flex-col justify-center items-center text-white text-center px-4 space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold min-h-[3rem]">
        {title}
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
