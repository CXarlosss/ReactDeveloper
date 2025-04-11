// @ts-nocheck
// src/components/publication/PostForm.jsx
import React, { useState } from "react";
import "../styles/publication/postForm.css";

export const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(post);
    }
    
    if (!content.trim() && !image) {
      alert("Escribe algo o sube una imagen");
      return;
    }

    const post = {
      content,
      image,
      createdAt: new Date().toISOString(),
    };

    onSubmit(post);
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
      ></textarea>

      <div className="post-form__footer">
        <label className="post-form__file-btn">
          📎 Imagen
          <input type="file" onChange={handleImageChange} hidden />
        </label>

        <button type="submit" className="post-form__submit">
          Publicar
        </button>
      </div>
    </form>
  );
};
