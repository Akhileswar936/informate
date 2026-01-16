import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  const titleText = "Welcome to Informate";
  const messageText =
    "A freelancing platform for smart startup ideas, personalized knowledge delivery, and professional networking";
  const taglineText = "Where ideas meet opportunity";

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [tagline, setTagline] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const started = useRef(false);

  useEffect(() => {
    if (started.current) return; // 🔑 prevents double execution
    started.current = true;

    let t = 0;
    let m = 0;
    let g = 0;

    const typeTitle = () => {
      if (t < titleText.length) {
        setTitle(titleText.slice(0, t + 1));
        t++;
        setTimeout(typeTitle, 120);
      } else {
        setTimeout(typeMessage, 400);
      }
    };

    const typeMessage = () => {
      if (m < messageText.length) {
        setMessage(messageText.slice(0, m + 1));
        m++;
        setTimeout(typeMessage, 40);
      } else {
        setTimeout(typeTagline, 400);
      }
    };

    const typeTagline = () => {
      if (g < taglineText.length) {
        setTagline(taglineText.slice(0, g + 1));
        g++;
        setTimeout(typeTagline, 80);
      } else {
        setTimeout(() => setShowButtons(true), 600);
      }
    };

    typeTitle();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400 min-h-screen flex flex-col justify-center items-center text-white text-center px-4 space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold min-h-[3rem]">
        {title}
      </h1>

      <p className="text-lg md:text-2xl min-h-[4rem]">
        {message}
      </p>

      <p className="text-xl italic min-h-[2rem]">
        {tagline}
      </p>

      {showButtons && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register">
            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Intro;
