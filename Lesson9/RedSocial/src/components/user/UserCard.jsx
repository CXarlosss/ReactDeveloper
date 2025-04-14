import React from "react";
import "../../styles/userCard.css";

export const UserCard = ({ user, onFollow, onUnfollow, isFollowing }) => {
  const avatarSrc = user.avatar || "/assets/img/user.png";
  const name = user.name || "Nombre no disponible";
  const username = user.username || "usuario";

  const handleClick = () => {
    isFollowing ? onUnfollow(user.id) : onFollow(user.id);
  };

  return (
    <div className="user-card">
      <img
        src={avatarSrc}
        alt={`Avatar de ${name}`}
        className="user-card__avatar"
      />
      <div className="user-card__info">
        <h4>{name}</h4>
        <p>@{username}</p>
      </div>
      <button
        className={`user-card__btn ${isFollowing ? "unfollow" : "follow"}`}
        onClick={handleClick}
        aria-label={isFollowing ? "Dejar de seguir" : "Seguir"}
      >
        {isFollowing ? "Dejar de seguir" : "Seguir"}
      </button>
    </div>
  );
};
