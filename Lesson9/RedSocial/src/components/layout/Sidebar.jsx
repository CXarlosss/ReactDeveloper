// src/components/layout/Sidebar.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/layout/sidebar.css";

export const Sidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div className="sidebar__user">
          <img
            src={user?.avatar || "/assets/img/user.png"}
            alt="Avatar"
            className="sidebar__avatar"
          />
          <h4>{user.displayName || user.email}</h4>
        </div>
        <ul className="sidebar__menu">
          <li><Link to="/profile">Mi perfil</Link></li>
          <li><Link to="/settings">Configuración</Link></li>
          <li><button onClick={logout}>Cerrar sesión</button></li>
        </ul>
      </div>
    </div>
  );
};
