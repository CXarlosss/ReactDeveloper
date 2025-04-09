// @ts-nocheck
// src/router/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Messages } from "../pages/Messages";
import { NotFound } from "../pages/NotFound";
import { Profile } from "../pages/Profile";
import { User } from "../pages/User";

import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout">
      {isAuthenticated && <Header />}

      <div className="main-content">
        {isAuthenticated && <Sidebar />}

        <section className="content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/messages" element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} />
            <Route path="/user/:username" element={isAuthenticated ? <User /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </div>

      {isAuthenticated && <Footer />}
    </div>
  );
};
