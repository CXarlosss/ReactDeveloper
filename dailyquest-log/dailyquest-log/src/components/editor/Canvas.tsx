"use client";

import { Rnd } from "react-rnd";
import { DayBlock } from "@/types/DayBlock";
import BlockRenderer from "../block-rendering/BlockRenderer";
import { useState } from "react";

console.log("🟢 Canvas.tsx IMPORTADO");

interface Props {
  blocks: DayBlock[];
  onChange: (updated: DayBlock) => void;
  selectedId?: string | null;
  setSelectedId?: (id: string | null) => void;
  onOpenInspector?: (block: DayBlock, x: number, y: number) => void;
}

export default function Canvas({
  blocks,
  onChange,
  selectedId,
  setSelectedId,
  onOpenInspector,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState("");

  function startEditing(block: DayBlock) {
    console.log("🔥 startEditing ejecutado para:", block);
    if (block.type === "text" || block.type === "title") {
      setEditingId(block.id);
      setTempContent(block.content);
    }
  }

  function finishEditing(block: DayBlock) {
    onChange({ ...block, content: tempContent });
    setEditingId(null);
  }

  console.log("🎨 Canvas RENDER — Blocks recibidos:", blocks);
return (
    <div className="canvas-area relative w-full h-full bg-neutral-100 overflow-scroll">
      {/* ← canvas-area NECESARIO para centrar nuevos bloques */}

      <div className="relative w-[3000px] h-[3000px]">
        {blocks.map((block) => {
          const isSelected = selectedId === block.id;

          return (
            <Rnd
              key={block.id}
              size={{ width: block.width ?? 200, height: block.height ?? 120 }}
              position={{ x: block.x, y: block.y }}
              bounds="parent"
              onMouseDown={(e) => {
                setSelectedId?.(block.id);
                e.stopPropagation();
              }}
              onDoubleClick={(e: { stopPropagation: () => void; }) => {
                e.stopPropagation();
                startEditing(block);
              }}
              onContextMenu={(e: { preventDefault: () => void; clientX: number; clientY: number; }) => {
                e.preventDefault();
                onOpenInspector?.(block, e.clientX, e.clientY);
              }}
              onDragStop={(e, d) =>
                onChange({ ...block, x: d.x, y: d.y })
              }
              onResizeStop={(e, dir, ref, delta, pos) =>
                onChange({
                  ...block,
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                  x: pos.x,
                  y: pos.y,
                })
              }
              style={{
                transform: `rotate(${block.rotation || 0}deg)`,
                zIndex: isSelected ? 999 : block.zIndex ?? 1,
              }}
              className={`rounded-lg border ${
                isSelected ? "ring-2 ring-blue-500 shadow-xl" : "shadow-md"
              }`}
            >
              {editingId === block.id ? (
                <textarea
                  autoFocus
                  value={tempContent}
                  onChange={(e) => setTempContent(e.target.value)}
                  onBlur={() => finishEditing(block)}
                  className="w-full h-full p-2 outline-none resize-none bg-yellow-100"
                />
              ) : (
                <div className="w-full h-full">
                  <BlockRenderer block={block} />
                </div>
              )}
            </Rnd>
          );
        })}
      </div>
    </div>
  );
}