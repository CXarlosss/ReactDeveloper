"use client";

import { useEffect, useState } from "react";
import { DayBlock } from "@/types/DayBlock";
import { Toolbar } from "../../components/ToolBar";
import MuralCanvas from "../../components/MuralCanva";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

export default function NewDayPage() {
  const router = useRouter();

  // Estado global de bloques
  const [blocks, setBlocks] = useState<DayBlock[]>([]);

  // Cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("new-day");
    if (saved) {
      try {
        setBlocks(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading local storage", e);
      }
    }
  }, []);

  // Autosave
  useEffect(() => {
    localStorage.setItem("new-day", JSON.stringify(blocks));
  }, [blocks]);

  // Añadir nuevos bloques
  function addBlock(block: DayBlock) {
    setBlocks((prev) => [...prev, block]);
  }

  // Actualizar bloque existente
  function updateBlock(updated: DayBlock) {
    setBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }

  // Guardar definitivamente el día
  async function saveDay() {
    const res = await fetch("/api/days", {
      method: "POST",
      body: JSON.stringify({
        date: new Date().toISOString().slice(0, 10),
        blocks,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    localStorage.removeItem("new-day");

    router.push(`/day/${result.id}`);
  }

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* TOOLBAR */}
      <Toolbar onAddBlock={addBlock} />

      {/* CANVAS */}
      <div className="overflow-scroll w-full h-full">
        <MuralCanvas blocks={blocks} onChange={updateBlock} />
      </div>

      {/* BOTÓN GUARDAR */}
      <button
        onClick={saveDay}
        className="
          fixed bottom-6 right-6
          px-6 py-3
          bg-indigo-600 hover:bg-indigo-700
          text-white font-semibold
          rounded-xl shadow-xl
        "
      >
        Guardar Día
      </button>
    </div>
  );
}
