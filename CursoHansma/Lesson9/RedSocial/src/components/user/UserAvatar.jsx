import React from "react";
import "../../styles/userAvatar.css";

export const UserAvatar = ({ user, size = 60, className = "" }) => {
  if (!user) return null;

  const avatarSrc = user?.photoURL || "/assets/img/user.png";
  const displayName = user?.displayName || user?.email || "Usuario";

  return (
    <div
      className={`user-avatar ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Avatar de ${displayName}`}
    >
      <img
        src={avatarSrc}
        alt={`Avatar de ${displayName}`}
        className="user-avatar__img"
        style={{ width: size, height: size }}
      />
      <p className="user-avatar__name">{displayName}</p>
    </div>
  );
};
