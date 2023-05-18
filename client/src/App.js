import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ShowObservations from "./components/ShowObservations";
import CreateObservation from "./components/CreateObservation";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/observe" element={<CreateObservation />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/show" element={<ShowObservations />} />
    </Routes>
  );
};

export default App;
