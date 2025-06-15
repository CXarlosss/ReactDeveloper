"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type Contacto = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
};

const STORAGE_KEY = "mis_contactos";

const ContactosContext = createContext<{
  contactos: Contacto[];
  agregarContacto: (c: Omit<Contacto, "id">) => void;
  eliminarContacto: (id: string) => void;
  obtenerContacto: (id: string) => Contacto | undefined;
} | null>(null);

export function ContactosProvider({ children }: { children: React.ReactNode }) {
  const [contactos, setContactos] = useState<Contacto[]>([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (datosGuardados) {
      try {
        const parsed = JSON.parse(datosGuardados) as Contacto[];
        setContactos(parsed);
      } catch (e) {
        console.error("Error al parsear contactos:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo: Omit<Contacto, "id">) => {
    const nuevoConId = { ...nuevo, id: uuidv4() };
    setContactos((prev) => [...prev, nuevoConId]);
  };

  const eliminarContacto = (id: string) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  const obtenerContacto = (id: string): Contacto | undefined => {
    return contactos.find((c) => c.id === id);
  };

  return (
    <ContactosContext.Provider value={{ contactos, agregarContacto, eliminarContacto, obtenerContacto }}>
      {children}
    </ContactosContext.Provider>
  );
}

export function useContactos() {
  const context = useContext(ContactosContext);
  if (!context) throw new Error("Debes envolver tu app con <ContactosProvider>");
  return context;
}
