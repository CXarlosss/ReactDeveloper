// src/App.jsx
import React from "react";
import { AppRouter } from "./router/AppRouter";

const App = () => {
  return (
    <div className="app-container">
      <main className="app-main">
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
