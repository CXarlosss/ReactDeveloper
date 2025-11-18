"use client";

import { DayBlock } from "@/types/DayBlock";

interface Props {
  block: DayBlock;
  onChange: (updated: DayBlock) => void;
  onDelete: () => void;
}

export default function BlockEditor({ block, onChange, onDelete }: Props) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow">
      {/* Tipo de bloque */}
      <p className="text-sm text-gray-500 mb-2">Tipo: {block.type}</p>

      {/* Edición según tipo */}
      {block.type === "title" && (
        <input
          className="w-full text-2xl font-bold border-b p-2"
          value={block.content}
          onChange={(e) =>
            onChange({ ...block, content: e.target.value })
          }
        />
      )}

      {block.type === "text" && (
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          value={block.content}
          onChange={(e) =>
            onChange({ ...block, content: e.target.value })
          }
        />
      )}

      {block.type === "quote" && (
        <textarea
          className="w-full italic border p-2 rounded"
          rows={3}
          value={block.content}
          onChange={(e) =>
            onChange({ ...block, content: e.target.value })
          }
        />
      )}

      {block.type === "image" && (
        <div>
          <input
            className="w-full border p-2 rounded"
            value={block.content}
            placeholder="URL de imagen"
            onChange={(e) =>
              onChange({ ...block, content: e.target.value })
            }
          />
          {block.content && (
            <img
              src={block.content}
              className="mt-2 rounded shadow"
              alt="preview"
            />
          )}
        </div>
      )}

      {block.type === "separator" && (
        <p className="text-gray-400 text-sm italic">
          — Separador —
        </p>
      )}

      {/* Botón eliminar */}
      <button
        onClick={onDelete}
        className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Eliminar bloque
      </button>
    </div>
  );
}
