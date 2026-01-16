import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Intro = () => {
  const title = "Welcome to Informate";
  const message =
    "A freelancing platform for smart startup ideas, personalized knowledge delivery, and professional networking";
  const tagline = "Where ideas meet opportunity";

  const [info, setInfo] = useState("");
  const [msg, setMsg] = useState("");
  const [tag, setTag] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const titleIndex = useRef(0);
  const messageIndex = useRef(0);
  const tagIndex = useRef(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
      axios.get("https://informate-backend.onrender.com/welcome").catch(() => {});
    const typeTitle = () => {
      if (titleIndex.current < title.length) {
        setInfo(title.slice(0, titleIndex.current + 1));
        titleIndex.current++;
        setTimeout(typeTitle, 100);
      } else {
        setTimeout(typeMessage, 200);
      }
    };

    const typeMessage = () => {
      if (messageIndex.current < message.length) {
        setMsg(message.slice(0, messageIndex.current + 1));
        messageIndex.current++;
        setTimeout(typeMessage, 100);
      } else {
        setTimeout(typeTagline, 200);
      }
    };

    const typeTagline = () => {
      if (tagIndex.current < tagline.length) {
        setTag(tagline.slice(0, tagIndex.current + 1));
        tagIndex.current++;
        setTimeout(typeTagline, 100);
      } else {
        setTimeout(() => setShowButtons(true), 200);
      }
    };

    typeTitle();
  }, []);

  return (
    <div className="w-full min-h-screen  bg-[url('/main.webp')] bg-cover bg-no-repeat bg-top md:bg-center flex flex-col justify-center items-center text-white text-center px-4 space-y-4">
      <h1 className="text-3xl md:text-5xl font-bold min-h-[3rem]">
        {info}
      </h1>

      <p className="text-lg md:text-2xl min-h-[2.5rem] max-w-3xl">
        {msg}
      </p>

      <p className="text-base md:text-xl italic opacity-90 min-h-[2rem]">
        {tag}
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
