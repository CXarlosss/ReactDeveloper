"use client";

import { useState } from "react";
import { Day } from "@/types/Day";
import { DayBlock } from "@/types/DayBlock";
import BlockToolbar from "../components/BlockToolBar";
import BlockList from "./BlockList";
import { v4 as uuid } from "uuid";

interface Props {
  initialDate?: string;
  initialBlocks?: DayBlock[];
  onSave: (data: { date: string; blocks: DayBlock[] }) => void;
}

export default function DayEditor({ initialDate = "", initialBlocks = [], onSave }: Props) {
  const [date, setDate] = useState(initialDate);
  const [blocks, setBlocks] = useState<DayBlock[]>(initialBlocks);

  function addBlock(type: string) {
    const newBlock: DayBlock = {
      id: uuid(),
      type: type as DayBlock["type"],
      content: type === "separator" ? "" : ""
    };
    setBlocks([...blocks, newBlock]);
  }

  function updateBlock(updated: DayBlock) {
    setBlocks(blocks.map((b) => (b.id === updated.id ? updated : b)));
  }

  function deleteBlock(id: string) {
    setBlocks(blocks.filter((b) => b.id !== id));
  }

  function handleSubmit() {
    onSave({ date, blocks });
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-gray-500">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <BlockToolbar onAdd={addBlock} />

      <BlockList
        blocks={blocks}
        onUpdate={updateBlock}
        onDelete={deleteBlock}
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Guardar
      </button>
    </div>
  );
}
