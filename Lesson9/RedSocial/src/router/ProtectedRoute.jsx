// src/router/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; // Puedes mostrar un loader si lo prefieres

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
