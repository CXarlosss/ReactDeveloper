// src/components/user/UserProfile.jsx
import React from "react";
import "../styles/userProfile.css";

export const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <img src={user.avatar || "/assets/img/user.png"} alt="avatar" className="user-profile__avatar" />
        <div className="user-profile__info">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <p>{user.bio || "Sin biografía"}</p>
        </div>
      </div>
      <div className="user-profile__stats">
        <span><strong>{user.followers?.length || 0}</strong> seguidores</span>
        <span><strong>{user.following?.length || 0}</strong> siguiendo</span>
        <span><strong>{user.postsCount || 0}</strong> publicaciones</span>
      </div>
    </div>
  );
};
