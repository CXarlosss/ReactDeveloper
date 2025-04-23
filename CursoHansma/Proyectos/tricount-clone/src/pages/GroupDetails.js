// @ts-nocheck
// src/pages/GroupDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { ExpenseItem, BalanceCard, Loader } from "../components";
import { calculateBalances } from "../utils/calculateBalances";
import React from "react";
import "../styles/groupDetails.css";

export const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = auth.currentUser.uid;

  useEffect(() => {
    const fetchGroup = async () => {
      const groupRef = doc(db, "groups", groupId);
      const groupSnap = await getDoc(groupRef);
      if (groupSnap.exists()) {
        setGroup({ id: groupSnap.id, ...groupSnap.data() });
      }
    };

    fetchGroup();

    const q = query(
      collection(db, "expenses"),
      where("groupId", "==", groupId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [groupId]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Seguro que quieres eliminar este gasto?");
    if (confirm) {
      await deleteDoc(doc(db, "expenses", id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/group/${groupId}/edit-expense/${id}`);
  };

  if (loading || !group) return <Loader />;

  const balances = calculateBalances(expenses, group.members);

  return (
    <div className="group-details">
      <h2>{group.name}</h2>
      <p>Miembros: {group.members.map(m => m.name || m.email).join(", ")}</p>

      <button onClick={() => navigate(`/group/${groupId}/add-expense`)}>
        + Añadir gasto
      </button>

      <h3>🧾 Gastos</h3>
      {expenses.length === 0 ? (
        <p>Aún no hay gastos</p>
      ) : (
        expenses.map((exp) => (
          <ExpenseItem
            key={exp.id}
            expense={exp}
            members={group.members}
            currentUserId={currentUserId}
            onEdit={() => handleEdit(exp.id)}
            onDelete={() => handleDelete(exp.id)}
          />
        ))
      )}

      <BalanceCard
        balances={balances}
        users={group.members}
        currentUserId={currentUserId}
      />
    </div>
  );
};
