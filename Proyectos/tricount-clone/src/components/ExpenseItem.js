// src/components/ExpenseItem.jsx
import React from "react";
import "../styles/expenseItem.css";

export const ExpenseItem = ({ expense, currentUserId, onEdit, onDelete, members }) => {
  const getUserName = (uid) => {
    const user = members.find((m) => m.uid === uid);
    return user?.name || "Usuario";
  };

  const isOwner = currentUserId === expense.paidBy;

  return (
    <div className="expense-item">
      <div className="expense-main">
        <strong>{expense.title}</strong>
        <p>
          💸 {expense.amount.toFixed(2)} € pagado por <b>{getUserName(expense.paidBy)}</b>
        </p>
        <p>
          🧍‍♂️ Dividido entre:{" "}
          {expense.splitWith.map((uid) => getUserName(uid)).join(", ")}
        </p>
      </div>
      {isOwner && (
        <div className="expense-actions">
          <button onClick={onEdit}>✏️</button>
          <button onClick={onDelete}>🗑️</button>
        </div>
      )}
    </div>
  );
};
