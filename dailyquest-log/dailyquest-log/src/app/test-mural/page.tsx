"use client";

import { useState } from "react";
import Canvas from "@/components/editor/Canvas";
import { DayBlock } from "@/types/DayBlock";
import { v4 as uuid } from "uuid";
import InspectorPanel from "@/components/inspector/InspectorPanel";

export default function TestMural() {
  const [blocks, setBlocks] = useState<DayBlock[]>([
    {
      id: uuid(),
      type: "text",
      content: "Bloque de texto movible",
      x: 100,
      y: 100,
    },
    {
      id: uuid(),
      type: "title",
      content: "Título movible",
      x: 400,
      y: 200,
    },
  ]);

  // 👉 selección
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 👉 inspector
  const [inspectorBlock, setInspectorBlock] = useState<DayBlock | null>(null);
  const [inspectorPos] = useState({ x: 0, y: 0 });

  function updateBlock(updated: DayBlock) {
    setBlocks((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );

    // mantener inspector vivo
    if (inspectorBlock && inspectorBlock.id === updated.id) {
      setInspectorBlock(updated);
    }
  }

  // 👉 abrir inspector (click derecho)
  function openInspector(block: DayBlock) {
    setInspectorBlock(block);
    setSelectedId(block.id);
  }

  return (
    <div className="flex w-full h-screen">

      {/* CANVAS */}
      <div className="flex-1 overflow-scroll bg-neutral-200">
        <Canvas
          blocks={blocks}
          onChange={updateBlock}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onOpenInspector={(b) => openInspector(b)}
        />
      </div>

      {/* PANEL LATERAL */}
      {inspectorBlock && (
        <div className="w-[320px] bg-white border-l shadow-xl overflow-y-auto">
          <InspectorPanel block={inspectorBlock} onUpdate={updateBlock} />
        </div>
      )}
    </div>
  );
}
