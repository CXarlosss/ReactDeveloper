// components/LoginForm.tsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [name, setName] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">Inicia sesión</h2>
      <input
        type="text"
        placeholder="Tu nombre"
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition">
        Entrar
      </button>
    </form>
  );
}
