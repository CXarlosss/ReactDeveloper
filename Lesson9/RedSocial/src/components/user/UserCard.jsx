// src/components/user/UserCard.jsx
import React from "react";
import "../../styles/userCard.css";

export const UserCard = ({ user, onFollow, onUnfollow, isFollowing }) => {
  return (
    <div className="user-card">
      <img src={user.avatar || "/assets/img/user.png"} alt="Avatar" className="user-card__avatar" />
      <div className="user-card__info">
        <h4>{user.name}</h4>
        <p>@{user.username}</p>
      </div>
      <button
        className={`user-card__btn ${isFollowing ? "unfollow" : "follow"}`}
        onClick={() => (isFollowing ? onUnfollow(user.id) : onFollow(user.id))}
      >
        {isFollowing ? "Dejar de seguir" : "Seguir"}
      </button>
    </div>
  );
};
