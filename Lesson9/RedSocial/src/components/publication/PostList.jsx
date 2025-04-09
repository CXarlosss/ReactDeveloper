// @ts-nocheck
// src/components/publication/PostList.jsx
import React from "react";
import { Post } from "./Post";
import "../styles/publication/postList.css";

export const PostList = ({ posts, onDelete }) => {
  if (!posts || posts.length === 0) {
    return <p className="post-list__empty">No hay publicaciones todavía.</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
};
