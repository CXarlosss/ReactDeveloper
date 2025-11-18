"use client";

interface Props {
  onAdd: (type: string) => void;
}

export default function BlockToolbar({ onAdd }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onAdd("title")}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        + Título
      </button>

      <button
        onClick={() => onAdd("text")}
        className="px-3 py-1 bg-gray-700 text-white rounded"
      >
        + Texto
      </button>

      <button
        onClick={() => onAdd("image")}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        + Imagen
      </button>

      <button
        onClick={() => onAdd("quote")}
        className="px-3 py-1 bg-purple-600 text-white rounded"
      >
        + Cita
      </button>

      <button
        onClick={() => onAdd("separator")}
        className="px-3 py-1 bg-gray-400 text-black rounded"
      >
        + Separador
      </button>
    </div>
  );
}
