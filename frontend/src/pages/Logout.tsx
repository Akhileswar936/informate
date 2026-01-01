import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    setTimeout(() => {
      toast.success("Logout successfully!");
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <div
        className="bg-[url('/main.jpg')] w-full min-h-screen flex items-center justify-center bg-cover bg-center p-4 ">
        <div className="bg-[rgba(255,255,255,0.3)] p-6 rounded-lg shadow-md text-center max-w-xs w-full md:max-w-sm shadow-md
                             hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Are you sure you want to log out?
          </h2>

          <button
            onClick={logout}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;

