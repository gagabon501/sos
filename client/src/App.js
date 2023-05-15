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
      <Route path="/" element={<Start />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/observe" element={<CreateObservation />}></Route>
      <Route path="/register" element={<RegisterForm />}></Route>
      <Route path="/show" element={<ShowObservations />}></Route>
    </Routes>
  );
};

export default App;
