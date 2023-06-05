import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ShowObservations from "./components/ShowObservations";
import CreateObservation from "./components/CreateObservation";
import LogOut from "./components/LogOut";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Start />} />
        <Route path="/dashboard" element={<Start />} />
        <Route path="/observe" element={<CreateObservation />} />
        <Route path="/show" element={<ShowObservations />} />
        <Route path="/logout" element={<LogOut />} />
      </Route>
    </Routes>
  );
};

export default App;
