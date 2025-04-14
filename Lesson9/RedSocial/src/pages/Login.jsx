// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify"; // 👈 NUEVO
import "../styles/pages/login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("¡Sesión iniciada con éxito!"); // ✅
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Correo o contraseña incorrectos.");
      toast.error("Error al iniciar sesión."); // ❌
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login" aria-label="Formulario de inicio de sesión">
      <h2>Iniciar sesión</h2>

      <form className="login__form" onSubmit={handleLogin}>
        <label htmlFor="email" className="visually-hidden">Correo electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label htmlFor="password" className="visually-hidden">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {errorMsg && (
          <p className="login__error" role="alert">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="login__button"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="login__hint">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="login__link"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
};
