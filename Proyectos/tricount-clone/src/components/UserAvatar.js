// src/components/UserAvatar.jsx
import React from "react";
import "../styles/userAvatar.css";
export const UserAvatar = ({ name = "", email = "" }) => {
  const getInitials = () => {
    if (name) {
      const parts = name.trim().split(" ");
      return parts.length >= 2
        ? parts[0][0] + parts[1][0]
        : parts[0][0];
    } else if (email) {
      return email[0].toUpperCase();
    }
    return "?";
  };

  return (
    <div className="user-avatar">
      {getInitials()}
      
    </div>
  );
};
