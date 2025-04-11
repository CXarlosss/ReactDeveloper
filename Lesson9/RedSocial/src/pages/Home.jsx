// @ts-nocheck
import React, { useState } from "react"; // 👈 FALTABA ESTO
import { useAuth } from "../hooks/useAuth";
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
        content: post.content,
        imageUrl: post.image || "",
        createdAt: Timestamp.now(),
        userId: user.uid,
        author: {
          name: user.displayName || user.email,
          avatar: user.photoURL || "",
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
    <section className="home">
      <div className="home__welcome">
        <h2>
          Bienvenido, <span>{user?.displayName || user?.email}</span> 👋
        </h2>
        <p>Comparte tus pensamientos con la comunidad.</p>
      </div>

      <div className="home__form">
        {posting && <p className="home__info">📤 Publicando...</p>}
        {error && <p className="home__error">❌ {error}</p>}
        <PostForm onSubmit={handlePostSubmit} />
      </div>

      <div className="home__feed">
        <h3>📢 Últimas publicaciones</h3>
        <PostList />
      </div>
    </section>
  );
};
