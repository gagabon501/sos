import { Navigate, Outlet } from "react-router-dom";

const isAuth = () => {
  //this function will get user's login status
  return localStorage.getItem("auth") == "true"; //this is just a temporary solution since this is a poor security practice. Use a global state variable using Redux or context/hooks
};

const ProtectedRoutes = () => {
  const isAuthenticated = isAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
