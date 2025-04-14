// @ts-nocheck
import React from "react";
import "../styles/pages/messages.css";

export const Messages = () => {
  return (
    <section className="messages-page" aria-label="Mensajes privados">
      <h2>📨 Mensajes privados</h2>

      <div className="messages-page__container">
        <img
          src="/assets/img/message_placeholder.svg"
          alt="Ilustración de mensajes"
          className="messages-page__image"
          loading="lazy"
        />
        <p>¡Aquí aparecerán tus conversaciones!</p>
        <p className="messages-page__info">Estamos trabajando en esto... 🚧</p>
      </div>
    </section>
  );
};
