// @ts-nocheck
// src/pages/EditExpense.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import "../styles/editExpense.css";

export const EditExpense = () => {
  const { groupId, expenseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitWith, setSplitWith] = useState([]);
  const [members, setMembers] = useState([]);

  // 🔁 Cargar miembros y datos del gasto
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener miembros del grupo
        const groupSnap = await getDoc(doc(db, "groups", groupId));
        if (groupSnap.exists()) {
          const groupData = groupSnap.data();
          setMembers(groupData.members);
        }

        // Obtener datos del gasto
        const expenseSnap = await getDoc(doc(db, "expenses", expenseId));
        if (expenseSnap.exists()) {
          const exp = expenseSnap.data();
          setTitle(exp.title);
          setAmount(exp.amount);
          setPaidBy(exp.paidBy);
          setSplitWith(exp.splitWith);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error.message);
      }
    };

    fetchData();
  }, [groupId, expenseId]);

  // ✅ Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !paidBy || splitWith.length === 0) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("El importe debe ser un número válido.");
      return;
    }

    try {
      await updateDoc(doc(db, "expenses", expenseId), {
        title,
        amount: parsedAmount,
        paidBy,
        splitWith
      });
      navigate(`/group/${groupId}`);
    } catch (err) {
      console.error("Error actualizando el gasto:", err.message);
    }
  };

  // 🔁 Selección de participantes
  const toggleSplitWith = (uid) => {
    setSplitWith((prev) =>
      prev.includes(uid)
        ? prev.filter((id) => id !== uid)
        : [...prev, uid]
    );
  };

  // 🖼️ UI
  return (
    <div className="form-container">
      <h2>Editar gasto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descripción"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Importe"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Pagado por:</label>
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} required>
          {members.map((m) => (
            <option key={m.uid} value={m.uid}>
              {m.name || m.email}
            </option>
          ))}
        </select>

        <label>Dividir entre:</label>
        <div className="checkbox-list">
          {members.map((m) => (
            <label key={m.uid}>
              <input
                type="checkbox"
                checked={splitWith.includes(m.uid)}
                onChange={() => toggleSplitWith(m.uid)}
              />
              {m.name || m.email}
            </label>
          ))}
        </div>

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};
