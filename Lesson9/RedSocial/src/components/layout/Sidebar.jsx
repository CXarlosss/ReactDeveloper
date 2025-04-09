import React from "react";
import { useAuth } from "../../context/AuthContext";

export const Sidebar = () => {
  const { user } = useAuth();

  // Seguridad: si aún no hay usuario cargado, no renderizar
  if (!user) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <img
          src={user?.avatar || "assets/img/user.png"}
          alt="Avatar"
          className="sidebar__avatar"
        />
        <h4>{user.displayName || user.email}</h4>
      </div>
      {/* otros elementos del sidebar */}
    </aside>
  );
};
