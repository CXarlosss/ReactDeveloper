// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import React from "react";

export const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [memberInput, setMemberInput] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const addMember = () => {
    const { name, email } = memberInput;
    if (!name || !email) return alert("Completa nombre y correo del miembro");

    // Si el usuario no está registrado, usamos su email como uid temporal único
    setMembers([...members, { name, email, uid: email }]);

    setMemberInput({ name: "", email: "" });
  };

  const removeMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName || members.length < 1) {
      return alert("Ponle nombre y al menos 1 miembro adicional al grupo.");
    }

    const currentUser = {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      name: auth.currentUser.displayName || "Yo"
    };

    const fullMembers = [
      currentUser,
      ...members.filter((m) => m.uid !== currentUser.uid)
    ];

    const groupData = {
      name: groupName,
      members: fullMembers,
      memberIds: fullMembers.map((m) => m.uid),
      createdBy: currentUser.uid,
      createdAt: Timestamp.now()
    };

    const groupRef = await addDoc(collection(db, "groups"), groupData);

    navigate(`/group/${groupRef.id}`);
  };

  return (
    <div className="form-container">
      <h2>Crear nuevo grupo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />

        <h4>Añadir miembros</h4>
        <div className="member-input">
          <input
            type="text"
            placeholder="Nombre"
            value={memberInput.name}
            onChange={(e) =>
              setMemberInput({ ...memberInput, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Correo"
            value={memberInput.email}
            onChange={(e) =>
              setMemberInput({ ...memberInput, email: e.target.value })
            }
          />
          <button type="button" onClick={addMember}>
            + Añadir
          </button>
        </div>

        <ul>
          {members.map((m, i) => (
            <li key={i}>
              {m.name} ({m.email}){" "}
              <button type="button" onClick={() => removeMember(i)}>
                ❌
              </button>
            </li>
          ))}
        </ul>

        <button type="submit">Crear grupo</button>
      </form>
    </div>
  );
};
