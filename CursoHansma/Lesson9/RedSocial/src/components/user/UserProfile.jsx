import React from "react";
import "../styles/userProfile.css";

export const UserProfile = ({ user }) => {
  if (!user) return null;

  const {
    avatar,
    name = "Nombre no disponible",
    username = "usuario",
    bio = "Sin biografía",
    followers = [],
    following = [],
    postsCount = 0,
  } = user;

  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <img
          src={avatar || "/assets/img/user.png"}
          alt={`Avatar de ${name}`}
          className="user-profile__avatar"
        />
        <div className="user-profile__info">
          <h2>{name}</h2>
          <p>@{username}</p>
          <p>{bio}</p>
        </div>
      </div>
      <div className="user-profile__stats">
        <span>
          <strong>{followers.length}</strong> seguidores
        </span>
        <span>
          <strong>{following.length}</strong> siguiendo
        </span>
        <span>
          <strong>{postsCount}</strong> publicaciones
        </span>
      </div>
    </div>
  );
};
