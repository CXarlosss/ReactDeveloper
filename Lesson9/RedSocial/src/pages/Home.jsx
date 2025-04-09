// @ts-nocheck
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { PostForm } from "../components/publication/PostForm";
import { PostList } from "../components/publication/PostList";
import "../styles/pages/home.css";

export const Home = () => {
  const { user } = useAuth();

  return (
    <section className="home">
      <div className="home__welcome">
        <h2>Bienvenido, <span>{user?.displayName || user?.email}</span> 👋</h2>
        <p>Comparte tus pensamientos con la comunidad.</p>
      </div>

      <div className="home__form">
        <PostForm />
      </div>

      <div className="home__feed">
        <h3>📢 Últimas publicaciones</h3>
        <PostList />
      </div>
    </section>
  );
};
