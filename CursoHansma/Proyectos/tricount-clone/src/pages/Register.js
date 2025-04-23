import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Completa todos los campos.");
    if (password.length < 6) return alert("Mínimo 6 caracteres de contraseña.");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario registrado con éxito");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Error al registrar: " + err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
};
