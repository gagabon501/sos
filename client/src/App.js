import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import LoginForm from "./components/LoginForm";
import ObservationForm from "./components/ObservationForm";
import RegisterForm from "./components/RegisterForm";
import ShowObservations from "./components/ShowObservations";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/observe" element={<ObservationForm />}></Route>
      <Route path="/register" element={<RegisterForm />}></Route>
      <Route path="/show" element={<ShowObservations />}></Route>
    </Routes>
  );
};

export default App;
