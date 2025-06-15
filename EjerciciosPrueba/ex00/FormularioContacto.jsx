import { useState } from "react";

export default function FormularioContacto() {
  // 1️⃣ Creamos un estado llamado formData para guardar los valores del formulario
  // Tiene tres campos: nombre, email y mensaje, que empiezan vacíos
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  // 2️⃣ Esta función se ejecuta cada vez que el usuario escribe en un input o textarea
  // e es el evento (el objeto del input que cambió)
  const handleChange = (e) => {
    // 3️⃣ Usamos setFormData para actualizar el estado
    // Creamos una copia del estado actual (...formData)
    // y luego actualizamos SOLO la propiedad que cambió:
    // [e.target.name] se refiere al "name" del input que disparó el evento
    // e.target.value es el nuevo valor que el usuario escribió
    setFormData({
      ...formData, // copia del estado anterior
      [e.target.name]: e.target.value, // campo actualizado
    });
  };

  // 4️⃣ Esta función se ejecuta cuando el usuario envía el formulario
  // e es el evento (el objeto del formulario que disparó el evento)
  const handleSubmit = (e) => {
    // 5️⃣ Evitamos el comportamiento predeterminado del navegador
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Mensaje:
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}

