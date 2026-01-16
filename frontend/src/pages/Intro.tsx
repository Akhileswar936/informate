import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Intro = () => {
  const title = "Welcome to Informate";
  const message = "Share your thoughts and experience";

  const [info, setInfo] = useState("");
  const [msg, setMsg] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const titleIndex = useRef(0);
  const messageIndex = useRef(0);
    useEffect(() => {
    axios.get("https://informate-backend.onrender.com/welcome").catch(() => {});
  }, []);
  useEffect(() => {
    const typeTitle = () => {
      if (titleIndex.current < title.length) {
        setInfo(title.slice(0, titleIndex.current + 1));
        titleIndex.current++;
        setTimeout(typeTitle, 400);
      } else {
        setTimeout(typeMessage, 600);
      }
    };

    const typeMessage = () => {
      if (messageIndex.current < message.length) {
        setMsg(message.slice(0, messageIndex.current + 1));
        messageIndex.current++;
        setTimeout(typeMessage, 400);
      } else {
        setTimeout(() => setShowButtons(true), 600);
      }
    };

    typeTitle();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400 min-h-screen flex flex-col justify-center items-center text-white text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 min-h-[3rem]">
        {info}
      </h1>

      <p className="text-lg md:text-2xl mb-6 min-h-[2rem]">
        {msg}
      </p>

      {showButtons && (
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
      )}
    </div>
  );
};

export default Intro;
