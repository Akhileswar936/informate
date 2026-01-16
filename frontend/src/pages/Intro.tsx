import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Intro = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [showTitle, setShowTitle] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    axios
      .get("https://informate-backend.onrender.com/welcome")
      .then((res) => {
        setTitle(res.data.title);
        setMessage(res.data.message);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 0);
    const t2 = setTimeout(() => setShowMessage(true), 15000);
    const t3 = setTimeout(() => setShowButtons(true), 30000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400 min-h-screen flex flex-col justify-center items-center text-white text-center px-4 space-y-6">

      {showTitle && (
        <h1 className="text-3xl md:text-5xl font-bold">
          {title}
        </h1>
      )}

      {showMessage && (
        <p className="text-lg md:text-2xl">
          {message}
        </p>
      )}

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
