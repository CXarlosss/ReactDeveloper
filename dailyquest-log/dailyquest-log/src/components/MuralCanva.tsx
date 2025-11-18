"use client";

import { Rnd } from "react-rnd";
import { DayBlock } from "@/types/DayBlock";
import { useState } from "react";

interface Props {
  blocks: DayBlock[];
  onChange: (updated: DayBlock) => void;
  selectedId?: string | null;
  setSelectedId?: (id: string | null) => void;

  // ⭐ nuevo → abrir inspector
  onOpenInspector?: (block: DayBlock, x: number, y: number) => void;
}

export default function MuralCanvas({
  blocks,
  onChange,
  selectedId,
  setSelectedId,
  onOpenInspector,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState("");

  function startEditing(block: DayBlock) {
    if (["text", "title", "code"].includes(block.type)) {
      setEditingId(block.id);
      setTempContent(block.content);
    }
  }

  function finishEditing(block: DayBlock) {
    onChange({ ...block, content: tempContent });
    setEditingId(null);
  }

  return (
    <div className="relative w-[3000px] h-[3000px] bg-neutral-100 border mx-auto my-10 rounded-lg">
      {blocks.map((block) => {
        const isSelected = selectedId === block.id;

        return (
          <Rnd
            key={block.id}
            size={{
              width: block.width || 220,
              height: block.height || 140,
            }}
            position={{ x: block.x, y: block.y }}
            bounds="parent"
            onMouseDown={(e) => {
              e.stopPropagation();
              setSelectedId?.(block.id);
            }}
            onDoubleClick={(e: {
              stopPropagation: () => void;
              clientX: number;
              clientY: number;
            }) => {
              e.stopPropagation();
              onOpenInspector?.(block, e.clientX, e.clientY); // ⭐ NUEVO
            }}
            onDragStop={(e, d) => onChange({ ...block, x: d.x, y: d.y })}
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
            className={`rounded-lg shadow-md border ${
              isSelected ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {editingId === block.id ? (
              <textarea
                autoFocus
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                onBlur={() => finishEditing(block)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    finishEditing(block);
                  }
                  if (e.key === "Escape") setEditingId(null);
                }}
                className="w-full h-full bg-yellow-100 p-2 outline-none resize-none"
              />
            ) : (
              <div
                onDoubleClick={() => startEditing(block)} // ⭐ Mantienes edición de texto
                className="w-full h-full select-none"
                style={{
                  opacity: block.opacity ?? 1,
                  background:
                    block.backgroundGradient ||
                    block.backgroundColor ||
                    "transparent",
                  color: block.color || "#000",
                  fontSize: block.fontSize ? `${block.fontSize}px` : "16px",
                  fontWeight: block.fontWeight || "normal",
                  textAlign: block.textAlign || "left",
                  borderRadius: block.borderRadius
                    ? `${block.borderRadius}px`
                    : 6,
                  border: block.borderWidth
                    ? `${block.borderWidth}px solid ${
                        block.borderColor || "#000"
                      }`
                    : "none",
                }}
              >
                {block.type === "text" && (
                  <div className="whitespace-pre-line p-1">{block.content}</div>
                )}

                {block.type === "title" && (
                  <div className="p-1 font-bold text-2xl whitespace-pre-line">
                    {block.content}
                  </div>
                )}

                {block.type === "image" && (
                  <img
                    src={block.content}
                    className="w-full h-full object-cover rounded"
                  />
                )}

                {block.type === "shape" && (
                  <div
                    className="w-full h-full"
                    style={{
                      background:
                        block.backgroundGradient ||
                        block.backgroundColor ||
                        block.color ||
                        "#ccc",
                      borderRadius: block.shapeType === "circle" ? "50%" : 8,
                    }}
                  ></div>
                )}

                {block.type === "code" && (
                  <pre className="bg-black text-green-400 p-2 text-sm overflow-auto rounded">
                    {block.content}
                  </pre>
                )}
              </div>
            )}
          </Rnd>
        );
      })}
    </div>
  );
}
