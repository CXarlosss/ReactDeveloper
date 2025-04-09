// src/App.jsx
import React from "react";
import { AppRouter } from "./router/AppRouter";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="app-container">
          <Header />
          <main className="app-main">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
