/* eslint-disable no-unused-vars */
// @ts-nocheck
import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PostList } from "../components/publication/PostList";
import { UserAvatar } from "../components/user/UserAvatar";
import "../styles/pages/profile.css";

export const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth(); // ✅ Aquí el cambio

  const isOwnProfile = username === user?.username;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <UserAvatar user={user} large />
        <div className="profile-info">
          <h2>{user?.name || "Usuario"}</h2>
          <p>@{user?.username}</p>
          <span>{user?.bio || "Aquí va tu biografía..."}</span>
        </div>
      </div>

      <div className="profile-posts">
        <h3>Publicaciones</h3>
        <PostList userId={user?.id} />
      </div>
    </div>
  );
};
