import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
// import Login from "./components/Login";

function Private() {
  const { isLoggedIn } = useAuthState();
  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Private;
