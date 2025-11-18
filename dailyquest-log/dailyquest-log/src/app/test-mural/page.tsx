"use client";

import { useState } from "react";
import MuralCanvas from "../../components/MuralCanva";
import { DayBlock } from "@/types/DayBlock";
import { v4 as uuid } from "uuid";

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

  function updateBlock(updated: DayBlock) {
    setBlocks((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
  }

  return (
    <div className="overflow-auto w-full h-screen">
      <MuralCanvas blocks={blocks} onChange={updateBlock} />
    </div>
  );
}
