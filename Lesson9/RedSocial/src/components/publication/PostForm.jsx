// @ts-nocheck
import React, { useState } from "react";
import "../styles/publication/postForm.css";

export const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      alert("Escribe algo o sube una imagen");
      return;
    }

    const post = {
      content: content.trim(),
      image,
      createdAt: new Date().toISOString(),
    };

    if (typeof onSubmit === "function") {
      onSubmit(post);
    }

    setContent("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="¿Qué estás pensando?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        aria-label="Contenido de la publicación"
      />

      <div className="post-form__footer">
        <label className="post-form__file-btn" htmlFor="file-upload">
          📎 Imagen
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />

        <button type="submit" className="post-form__submit">
          Publicar
        </button>
      </div>
    </form>
  );
};
