⁹import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Intro = () => {
  const TITLE_TEXT = "Information Sharing Platform for Startup Ideas";
  const MESSAGE_TEXT = "A freelancing platform for smart startup ideas, personalized knowledge delivery, and professional networking";
  const TAGLINE_TEXT = "Where ideas meet opportunity";

  const [info, setInfo] = useState("");
  const [msg, setMsg] = useState("");
  const [tag, setTag] = useState("");
  const [animationDone, setAnimationDone] = useState(false);
  const [isServerAwake, setIsServerAwake] = useState(false);

  useEffect(() => {
    const wakeServer = async () => {
      try {
        await axios.get("https://informate-backend.onrender.com/welcome");
        setIsServerAwake(true);
      } catch (error) {
        console.error(error);
      }
    };
    
    wakeServer();

    let titleIndex = 0;
    let messageIndex = 0;
    let taglineIndex = 0;

    const typeTitle = () => {
      if (titleIndex < TITLE_TEXT.length) {
        setInfo(TITLE_TEXT.slice(0, titleIndex + 1));
        titleIndex++;
        setTimeout(typeTitle, 60);
      } else {
        setTimeout(typeMessage, 40);
      }
    };

    const typeMessage = () => {
      if (messageIndex < MESSAGE_TEXT.length) {
        setMsg(MESSAGE_TEXT.slice(0, messageIndex + 1));
        messageIndex++;
        setTimeout(typeMessage, 40);
      } else {
        setTimeout(typeTagline, 40);
      }
    };

    const typeTagline = () => {
      if (taglineIndex < TAGLINE_TEXT.length) {
        setTag(TAGLINE_TEXT.slice(0, taglineIndex + 1));
        taglineIndex++;
        setTimeout(typeTagline, 40);
      } else {
        setAnimationDone(true);
      }
    };

    typeTitle();
  }, []);

  return (
    <>
      <div className="sr-only">
        <h1>{TITLE_TEXT}</h1>
        <p>{MESSAGE_TEXT}</p>
        <h2>{TAGLINE_TEXT}</h2>
      </div>

      <div className="min-h-screen bg-[url('/main.webp')] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center text-white text-center px-4 space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold min-h-[3rem]">{info}</h1>
        <h2 className="text-xl md:text-2xl font-medium min-h-[2.5rem]">{msg}</h2>
        <p className="text-base md:text-xl italic opacity-90 min-h-[2rem]">{tag}</p>

        {animationDone && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {isServerAwake ? (
              <>
                <Link to="/register">
                  <button className="bg-gray-800 hover:bg-gray-700 transition text-white font-semibold py-2 px-6 rounded shadow-lg">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-gray-800 hover:bg-gray-700 transition text-white font-semibold py-2 px-6 rounded">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2 text-sm opacity-80">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Connecting to server...
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Intro;
