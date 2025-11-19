"use client";

import { useEffect, useState } from "react";
import { DayBlock } from "@/types/DayBlock";
import { Toolbar } from "../../components/ToolBar";
import Canvas from "@/components/editor/Canvas";
import InspectorPanel from "@/components/inspector/InspectorPanel";
import { useRouter } from "next/navigation";

export default function NewDayPage() {
  const router = useRouter();

  const [blocks, setBlocks] = useState<DayBlock[]>([]);

  // 👉 selección activa
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 👉 inspector
  const [inspectorBlock, setInspectorBlock] = useState<DayBlock | null>(null);

  // 👉 POS del inspector (no se usa si está fijo)
  const [inspectorPos, setInspectorPos] = useState({ x: 100, y: 100 });

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

  // 👉 añadir bloque centrado
  function addBlock(block: DayBlock) {
    const canvas = document.querySelector(".canvas-area");

    if (!canvas) return;

    const viewW = canvas.clientWidth;
    const viewH = canvas.clientHeight;
    const scrollX = canvas.scrollLeft;
    const scrollY = canvas.scrollTop;

    const centerX = scrollX + viewW / 2;
    const centerY = scrollY + viewH / 2;

    const centered = {
      ...block,
      x: centerX - 100,
      y: centerY - 50,
    };

    setBlocks((prev) => [...prev, centered]);
    setSelectedId(centered.id);
  }

  // 👉 actualizar bloque
  function updateBlock(updated: DayBlock) {
    setBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));

    if (inspectorBlock?.id === updated.id) {
      setInspectorBlock(updated);
    }
  }

  // 👉 abrir inspector
  function openInspector(block: DayBlock, x: number, y: number) {
    setInspectorBlock(block);
    setSelectedId(block.id);
    setInspectorPos({ x, y });
  }

  // GUARDAR
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
    <div className="w-full h-screen overflow-hidden flex bg-neutral-100">

      {/* TOOLBAR */}
      <div className="w-[260px] border-r bg-white shadow-md z-50">
        <Toolbar onAddBlock={addBlock} />
      </div>

      {/* CANVAS */}
      <div className="canvas-area flex-1 relative overflow-scroll bg-neutral-200">
        <Canvas
          blocks={blocks}
          onChange={updateBlock}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onOpenInspector={openInspector}
        />
      </div>

      {/* PANEL LATERAL DERECHO fijo */}
      {inspectorBlock && (
        <div className="w-[320px] border-l bg-white shadow-xl overflow-y-auto">
          <InspectorPanel block={inspectorBlock} onUpdate={updateBlock} />
        </div>
      )}

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
