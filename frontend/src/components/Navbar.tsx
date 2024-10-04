import { useCallback } from "react";
import { useAuthState } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { profile, setProfile, setIsLoggedIn } = useAuthState();
  const navigate = useNavigate();
  const logoutHandler = useCallback(() => {
    localStorage.removeItem("profile");
    setProfile({ id: "", name: "", username: "", token: "" });
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  }, [setIsLoggedIn, setProfile, navigate]);
  return (
    <div className="w-screen h-[40px] flex items-center justify-between bg-blue-100">
      <span className="flex-1 flex justify-evenly gap-2  sm:gap-20 items-center px-3 sm:px-10">
        <Link to={"/"} className="hover:bg-slate-100 px-2 py-0.5 rounded-md">
          Home
        </Link>
        <Link
          className="hover:bg-slate-100 px-2 py-0.5 rounded-md"
          to="/employee_list"
        >
          Employee List
        </Link>
      </span>
      <span className="flex-1 flex justify-end  gap-2 sm:gap-20 items-center px-3 sm:px-10">
        <span className="">{profile.name}</span>
        <button
          onClick={logoutHandler}
          className="hover:bg-slate-100 px-2 py-0.5 rounded-md"
        >
          Logout
        </button>
      </span>
    </div>
  );
}

export default Navbar;
