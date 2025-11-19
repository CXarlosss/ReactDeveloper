"use client";

import { useState } from "react";
import { DayBlock } from "@/types/DayBlock";

import ToolBar from "../ToolBar/ToolBar";
import Canvas from "./Canvas";
import InspectorPanel from "../inspector/InspectorPanel";

interface Props {
  initialDate?: string;
  initialBlocks?: DayBlock[];
  onSave: (data: { date: string; blocks: DayBlock[] }) => void;
}

export default function DayEditor({
  initialDate = "",
  initialBlocks = [],
  onSave,
}: Props) {
  const [date, setDate] = useState(initialDate);
  const [blocks, setBlocks] = useState<DayBlock[]>(initialBlocks);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [inspectorBlock, setInspectorBlock] = useState<DayBlock | null>(null);

  // 👉 Añadir bloque desde la toolbar
  function handleAddBlock(newBlock: DayBlock) {
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedId(newBlock.id);
    setInspectorBlock(newBlock);
    setInspectorOpen(true);
  }

  // 👉 Actualizar cualquier bloque
  function updateBlock(updated: DayBlock) {
    setBlocks((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
    setInspectorBlock(updated);
  }

  // 👉 Abrir inspector desde Canvas
  function openInspector(block: DayBlock) {
    setSelectedId(block.id);
    setInspectorBlock(block);
    setInspectorOpen(true);
  }

  // 👉 Guardar día completo
  function handleSave() {
    onSave({ date, blocks });
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* ========== TOOLBAR IZQUIERDA ========== */}
      <div className="w-[260px] bg-white border-r shadow-xl">
        <ToolBar onAddBlock={handleAddBlock} />
      </div>

      {/* ========== CANVAS ========== */}
      <div className="flex-1 relative bg-neutral-100">
        <Canvas
          blocks={blocks}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onChange={updateBlock}
          onOpenInspector={openInspector}
        />
      </div>

      {/* ========== INSPECTOR ========== */}
      <div
        className={`
          w-[300px] border-l bg-white shadow-xl transition-all
          ${inspectorOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <InspectorPanel
          block={inspectorBlock}
          onUpdate={updateBlock}
        />
      </div>

      {/* ========== SAVE BUTTON (FLOATING) ========== */}
      <button
        onClick={handleSave}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
      >
        Guardar Día
      </button>
    </div>
  );
}
