// src/router/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  // Si está autenticado, redirige a inicio
  return !user ? children : <Navigate to="/" />;
};

export default PublicRoute;
