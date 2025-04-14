// @ts-nocheck
import React from "react";
import { PostList } from "../components/publication/PostList";
import { UserAvatar } from "../components/user/UserAvatar";
import { useAuth } from "../context/AuthContext"; // ✅ mejor directo del contexto
import "../styles/pages/profile.css";

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="profile__loading">Cargando perfil...</p>;
  }

  const {
    displayName = "Usuario sin nombre",
    email = "sin-email@correo.com",
    bio = "Aquí va tu biografía...",
    uid,
  } = user;

  return (
    <section className="profile-page" aria-label="Perfil de usuario">
      <header className="profile-header">
        <UserAvatar user={user} size={80} className="profile-avatar" />

        <div className="profile-info">
          <h2>{displayName}</h2>
          <p className="profile-info__email">@{email}</p>
          <p className="profile-info__bio">{bio}</p>
        </div>
      </header>

      <section className="profile-posts" aria-label="Tus publicaciones">
        <h3>Publicaciones</h3>
        <PostList userId={uid} />
      </section>
    </section>
  );
};
