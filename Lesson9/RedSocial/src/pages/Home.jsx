// @ts-nocheck
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ mejor usar directamente el hook oficial
import { PostForm } from "../components/publication/PostForm";
import { PostList } from "../components/publication/PostList";
import "../styles/pages/home.css";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const Home = () => {
  const { user } = useAuth();
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  const handlePostSubmit = async (post) => {
    if (!post.content.trim() && !post.image) return;

    try {
      setPosting(true);
      setError(null);

      await addDoc(collection(db, "posts"), {
        content: post.content.trim(),
        imageUrl: post.image || "",
        createdAt: Timestamp.now(),
        userId: user.uid,
        author: {
          name: user.displayName || user.email,
          avatar: user.photoURL || "/assets/img/user.png",
        },
      });
    } catch (err) {
      console.error("Error al publicar:", err);
      setError("No se pudo publicar. Intenta de nuevo.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <section className="home" aria-label="Inicio">
      <header className="home__welcome">
        <h2>
          Bienvenido, <span>{user?.displayName || user?.email}</span> 👋
        </h2>
        <p>Comparte tus pensamientos con la comunidad.</p>
      </header>

      <div className="home__form">
        {posting && (
          <p className="home__info" role="status">
            📤 Publicando...
          </p>
        )}
        {error && (
          <p className="home__error" role="alert">
            ❌ {error}
          </p>
        )}
        <PostForm onSubmit={handlePostSubmit} />
      </div>

      <section className="home__feed" aria-label="Últimas publicaciones">
        <h3>📢 Últimas publicaciones</h3>
        <PostList userId={null} />
      </section>
    </section>
  );
};
