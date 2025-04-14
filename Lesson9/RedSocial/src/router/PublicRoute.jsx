// src/router/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loader">Cargando...</div>;

  return !user ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
