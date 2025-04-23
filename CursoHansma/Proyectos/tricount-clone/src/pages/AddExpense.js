// @ts-nocheck
// src/pages/AddExpense.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import {
  doc,
  addDoc,
  collection,
  getDoc,
  Timestamp
} from "firebase/firestore";
import { auth } from "../firebase/config";
import React from "react";
import "../styles/addExpense.css";

export const AddExpense = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [members, setMembers] = useState([]);
  const [paidBy, setPaidBy] = useState("");
  const [splitWith, setSplitWith] = useState([]);

  // Cargar miembros del grupo
  useEffect(() => {
    const fetchGroup = async () => {
      const groupRef = doc(db, "groups", groupId);
      const groupSnap = await getDoc(groupRef);
      if (groupSnap.exists()) {
        const data = groupSnap.data();
        setMembers(data.members);
        setPaidBy(auth.currentUser.uid);
        setSplitWith(data.members.map((m) => m.uid));
      }
    };
    fetchGroup();
  }, [groupId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !paidBy || splitWith.length === 0) {
      return alert("Completa todos los campos");
    }

    const expenseRef = collection(db, "expenses");

    await addDoc(expenseRef, {
      groupId,
      title,
      amount: parseFloat(amount),
      paidBy,
      splitWith,
      createdAt: Timestamp.now()
    });

    navigate(`/group/${groupId}`);
  };

  const toggleSplitWith = (uid) => {
    if (splitWith.includes(uid)) {
      setSplitWith(splitWith.filter((id) => id !== uid));
    } else {
      setSplitWith([...splitWith, uid]);
    }
  };

  return (
    <div className="form-container">
      <h2>Nuevo gasto</h2>
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
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
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

        <button type="submit">Guardar gasto</button>
      </form>
    </div>
  );
};
