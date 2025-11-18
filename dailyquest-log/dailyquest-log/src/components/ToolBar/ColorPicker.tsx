"use client";

import { v4 as uuidv4 } from "uuid";

const COLORS = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#fbbf24",
  "#22c55e",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#94a3b8"
];

const GRADIENTS = [
  "linear-gradient(135deg, #ef4444, #fca5a5)",
  "linear-gradient(135deg, #3b82f6, #a5b4fc)",
  "linear-gradient(135deg, #22c55e, #bbf7d0)",
  "linear-gradient(135deg, #f97316, #fdba74)",
  "linear-gradient(135deg, #ec4899, #f9a8d4)",
  "linear-gradient(135deg, #6366f1, #c7d2fe)"
];

interface Props {
  onSelect: (value: string) => void;
  label?: string;
}

export default function ColorPicker({ onSelect, label = "Color" }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-neutral-700">{label}</p>

      {/* PALETA DE COLORES */}
      <div className="grid grid-cols-6 gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className="h-7 w-7 rounded-full border shadow-sm hover:scale-105 transition"
            style={{ background: c }}
          />
        ))}
      </div>

      {/* GRADIENTES */}
      <p className="text-sm mt-4 font-medium text-neutral-700">Gradientes</p>
      <div className="grid grid-cols-3 gap-2">
        {GRADIENTS.map((g) => (
          <button
            key={g}
            onClick={() => onSelect(g)}
            className="h-10 rounded-lg shadow-sm border hover:scale-105 transition"
            style={{ background: g }}
          />
        ))}
      </div>

      {/* PICKER AVANZADO */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="color"
          className="w-10 h-10 rounded cursor-pointer border"
          onChange={(e) => onSelect(e.target.value)}
        />
        <span className="text-sm text-neutral-600">Elegir color exacto</span>
      </div>
    </div>
  );
}
