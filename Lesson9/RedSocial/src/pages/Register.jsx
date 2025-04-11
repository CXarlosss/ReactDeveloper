// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import "../styles/pages/register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name || !form.email || !form.password) {
      return setErrorMsg("Rellena todos los campos.");
    }

    if (form.password.length < 6) {
      return setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, {
        displayName: form.name
      });
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      setErrorMsg("Error al registrar. Es posible que el correo ya esté en uso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <h2>Crear cuenta</h2>
      <form className="register__form" onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        {errorMsg && <p className="register__error">{errorMsg}</p>}

        <button
          type="submit"
          className="register__button"
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>

      <p className="register__hint">
        ¿Ya tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="register__link"
        >
          Inicia sesión
        </button>
      </p>
    </div>
  );
};
