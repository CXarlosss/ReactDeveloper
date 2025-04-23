// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername, getPostsByUserId } from "../helpers/api";
import { UserAvatar } from "../components/user/UserAvatar";
import { PostList } from "../components/publication/PostList";
import "../styles/pages/user.css";

export const User = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const user = await getUserByUsername(username);
        if (!user) {
          setError("Usuario no encontrado.");
          return;
        }

        setUserData(user);

        if (user?.id) {
          const posts = await getPostsByUserId(user.id);
          setUserPosts(posts);
        }
      } catch (err) {
        console.error("Error al cargar perfil:", err);
        setError("Error al cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return <p className="user-loading" role="status">Cargando perfil...</p>;
  }

  if (error) {
    return <p className="user-error" role="alert">{error}</p>;
  }

  const {
    name = "Nombre no disponible",
    username: uname = "usuario",
    bio = "Este usuario aún no ha escrito una bio.",
  } = userData;

  return (
    <section className="user-profile" aria-label={`Perfil de ${uname}`}>
      <header className="user-header">
        <UserAvatar user={userData} size={80} className="user-avatar" />
        <div className="user-info">
          <h2>{name}</h2>
          <p className="user-info__username">@{uname}</p>
          <p className="user-info__bio">{bio}</p>
        </div>
      </header>

      <section className="user-posts" aria-label={`Publicaciones de ${uname}`}>
        <h3>📢 Publicaciones</h3>
        <PostList posts={userPosts} />
      </section>
    </section>
  );
};
