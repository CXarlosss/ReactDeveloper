// src/components/BalanceCard.jsx
import React from "react";
import "../styles/balanceCard.css"; // Asegúrate de tener este archivo CSS
export const BalanceCard = ({ balances, users, currentUserId }) => {
  const getUserName = (id) => {
    const user = users.find((u) => u.uid === id);
    return user?.name || "Desconocido";
  };

  return (
    <div className="balance-card">
      <h3>💰 Balance del grupo</h3>
      {balances.length === 0 ? (
        <p>Todo está saldado ✅</p>
      ) : (
        <ul>
          {balances.map((b, i) => (
            <li key={i}>
              <strong>{getUserName(b.from)}</strong> le debe a{" "}
              <strong>{getUserName(b.to)}</strong>:{" "}
              <span style={{ color: "#2ecc71" }}>{b.amount.toFixed(2)} €</span>
              {b.from === currentUserId && <span> (¡tú!)</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
