// src/router/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Messages } from "../pages/Messages";
import { NotFound } from "../pages/NotFound";
import { Profile } from "../pages/Profile";
import { User } from "../pages/User";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext"; // ✅ Usa directamente el contexto unificado

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout">
      {isAuthenticated && <Header />}

      <div className="main-content">
        {isAuthenticated && <Sidebar />}

        <main className="content">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

            {/* Rutas protegidas */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/user/:username" element={<ProtectedRoute><User /></ProtectedRoute>} />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {isAuthenticated && <Footer />}
    </div>
  );
};
