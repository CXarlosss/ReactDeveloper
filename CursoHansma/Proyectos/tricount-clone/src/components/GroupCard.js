// src/components/GroupCard.jsx
import React from "react";
import "../styles/groupCard.css";
export const GroupCard = ({ group, totalExpenses = 0, onClick }) => {
  return (
    <div className="group-card" onClick={onClick}>
      <h3>{group.name}</h3>
      <p>👥 {group.members.length} miembros</p>
      <p>💰 {totalExpenses.toFixed(2)} € gastados</p>
    </div>
  );
};
