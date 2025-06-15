"use client";
import Link from "next/link";
import { useContactos } from "../../lib/ContactosContext";

export default function ContactosPage() {
  const { contactos } = useContactos(); // Esto ya viene tipado desde el hook
  console.log("Contactos cargados:", contactos);

  return (
    <main>
      <h1>Contactos</h1>
      <ul>
        {contactos.map((c) => (
          <li key={c.id}>
            <Link href={`/contactos/${c.id}`}>
              {c.nombre} – {c.email}
            </Link>
          </li>
        ))}
      </ul>
      <br />
      <Link href="/contactos/nuevo">➕ Añadir nuevo</Link>
    </main>
  );
}
