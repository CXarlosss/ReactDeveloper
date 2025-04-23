// @ts-nocheck
import { auth } from "../firebase/config";
import React from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isRegistering, setIsRegistering] = React.useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Usuario creado con éxito.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Inicio de sesión exitoso.");
      }

      // ✅ Guardar auth y redirigir
      localStorage.setItem("isAuth", true);
      navigate("/dashboard");

    } catch (error) {
      alert("Error: " + error.message);
      console.error("Error: ", error.message);
    }
  };

  return (
    <div  style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>{isRegistering ? "Registrarse" : "Iniciar sesión"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">
          {isRegistering ? "Crear cuenta" : "Entrar"}
        </button>
      </form>
      <p>
        {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Inicia sesión" : "Regístrate"}
        </button>
      </p>
    </div>
  );
};
