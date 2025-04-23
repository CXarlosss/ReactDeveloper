// @ts-nocheck
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { GroupCard, Loader } from "../components";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/dashboard.css";

export const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();

  // 🔁 Obtener grupos donde el usuario está incluido
  useEffect(() => {
    const q = query(collection(db, "groups"), where("memberIds", "array-contains", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groupData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setGroups(groupData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  // 🔁 Obtener todos los gastos
  useEffect(() => {
    const q = query(collection(db, "expenses"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expenseData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setExpenses(expenseData);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  return (
    <div className="dashboard">
      <h2>👋 Hola, {auth.currentUser?.displayName || auth.currentUser?.email}</h2>
      <button onClick={handleCreateGroup}>+ Crear nuevo grupo</button>

      {loading ? (
        <Loader />
      ) : groups.length === 0 ? (
        <p>No tienes grupos aún. Crea uno para comenzar 💡</p>
      ) : (
        <div className="group-list">
          {groups.map(group => {
            const groupExpenses = expenses.filter(exp => exp.groupId === group.id);
            const total = groupExpenses.reduce((acc, curr) => acc + curr.amount, 0);

            return (
              <GroupCard
                key={group.id}
                group={group}
                totalExpenses={total}
                onClick={() => navigate(`/group/${group.id}`)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
