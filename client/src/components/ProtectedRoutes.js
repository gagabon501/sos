import { Navigate, Outlet } from "react-router-dom";

const isAuth = () => {
  //this function will get user's login status
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuthenticated = isAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
