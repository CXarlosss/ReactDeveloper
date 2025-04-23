// src/App.jsx
import React from "react";
import { AppRouter } from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="app-container">
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
