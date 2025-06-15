"use client";
import { useParams, useRouter } from "next/navigation";
import { useContactos } from "../../../lib/ContactosContext";

export default function DetalleContacto() {
  const { id } = useParams();
  const { obtenerContacto, eliminarContacto } = useContactos();
  const router = useRouter();

  // 🔒 Verificamos que 'id' sea string y esté definido
  if (typeof id !== "string") {
    return <p>ID inválido</p>;
  }

  const contacto = obtenerContacto(id);
  if (!contacto) return <p>Contacto no encontrado</p>;

  const handleEliminar = () => {
    eliminarContacto(id);
    router.push("/contactos");
  };

  return (
    <main>
      <h1>{contacto.nombre}</h1>
      <p>Email: {contacto.email}</p>
      <p>Teléfono: {contacto.telefono}</p>
      <button onClick={handleEliminar}>🗑 Eliminar</button>
    </main>
  );
}
