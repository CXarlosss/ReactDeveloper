// src/components/user/UserAvatar.jsx
import React from "react";
import "../../styles/userAvatar.css";

export const UserAvatar = ({ user, size = 60, className = "" }) => {
  if (!user) return null;

  return (
    <div className={`user-avatar ${className}`} style={{ width: size, height: size }}>
      <img
        src={user?.photoURL || "/assets/img/user.png"}
        alt="Avatar"
        className="user-avatar__img"
        style={{ width: size, height: size }}
      />
      <p className="user-avatar__name">{user?.displayName || user?.email}</p>
    </div>
  );
};
