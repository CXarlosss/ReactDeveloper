// @ts-nocheck
import React from "react";
import "../styles/pages/messages.css";

export const Messages = () => {
  return (
    <div className="messages-page">
      <h2>📨 Mensajes privados</h2>

      <div className="messages-page__container">
        <img
          src="/assets/img/message_placeholder.svg"
          alt="Mensajes ilustración"
          className="messages-page__image"
        />
        <p>¡Aquí aparecerán tus conversaciones!</p>
        <p className="messages-page__info">Estamos trabajando en esto... 🚧</p>
      </div>
    </div>
  );
};
