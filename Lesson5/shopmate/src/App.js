import { AllRoutes } from "./routes/AllRoutes";
import { Header } from "./components";
import './App.css';
import React from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <AllRoutes />
    </div>
  );
}

export default App;