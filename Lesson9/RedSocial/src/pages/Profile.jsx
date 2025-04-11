// @ts-nocheck
import React from "react";
import { PostList } from "../components/publication/PostList";
import { UserAvatar } from "../components/user/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages/profile.css";

export const Profile = () => {
  const { user } = useAuth(); // viene del contexto

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <UserAvatar user={user} large />
        <div className="profile-info">
          <h2>{user.displayName || "Usuario sin nombre"}</h2>
          <p>@{user.email}</p>
          <span>{user.bio || "Aquí va tu biografía..."}</span>
        </div>
      </div>

      <div className="profile-posts">
        <h3>Publicaciones</h3>
        <PostList userId={user.uid} />
      </div>
    </div>
  );
};
