// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import "../styles/navbar.css";

export const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        <span className="logo">💸 SplitMate</span>
      </div>

      <div className="navbar-right">
        <span className="user-name">👤 {user?.displayName || user?.email}</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
};
