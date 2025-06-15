"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContactos } from "../../../lib/ContactosContext";

export default function NuevoContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const { agregarContacto } = useContactos();
  const router = useRouter();

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  agregarContacto(formData);
  router.push("/contactos");
};

  return (
    <main>
      <h1>Nuevo Contacto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />
        <br />
        <button type="submit">Guardar</button>
      </form>
    </main>
  );
}
