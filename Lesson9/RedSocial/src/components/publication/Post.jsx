// src/components/publication/Post.jsx
import React from "react";
import "../styles/publication/post.css";

export const Post = ({ post, onDelete, onEdit }) => {
  const { content, author, createdAt, imageUrl } = post;

  return (
    <article className="post">
      <header className="post__header">
        <img
          src={author?.avatar || "/assets/img/user.png"}
          alt={`Avatar de ${author?.name || author?.email || "usuario"}`}
          className="post__avatar"
        />
        <div className="post__info">
          <span className="post__author">
            {author?.name ?? author?.email ?? "Usuario anónimo"}
          </span>
          <span className="post__date">
            {createdAt ? new Date(createdAt).toLocaleString() : "Justo ahora"}
          </span>
        </div>

        <div className="post__actions">
          {onEdit && (
            <button
              onClick={() => onEdit(post)}
              className="post__btn edit"
              aria-label="Editar publicación"
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              className="post__btn delete"
              aria-label="Eliminar publicación"
            >
              🗑️
            </button>
          )}
        </div>
      </header>

      <div className="post__content">
        <p>{content}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Imagen de la publicación"
            className="post__image"
          />
        )}
      </div>
    </article>
  );
};
