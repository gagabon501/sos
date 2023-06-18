import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ShowObservations from "./components/ShowObservations";
import CreateObservation from "./components/CreateObservation";
import LogOut from "./components/LogOut";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forgot" element={<ForgotPassword />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Start />} />
        <Route path="/dashboard" element={<Start />} />
        <Route path="/observe" element={<CreateObservation />} />
        <Route path="/show" element={<ShowObservations />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/updateuser" element={<UpdateProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default App;
