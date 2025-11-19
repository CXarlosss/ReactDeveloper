"use client";

import { memo, useCallback } from "react";
import { COLORS as DEFAULT_COLORS, GRADIENTS as DEFAULT_GRADIENTS } from "@/data/colors";

interface Props {
  onSelect: (value: string) => void;
  label?: string;
  selected?: string;

  // override if needed
  colors?: string[];
  gradients?: string[];
}

function ColorPicker({
  onSelect,
  selected,
  label = "Color",
  colors = DEFAULT_COLORS,
  gradients = DEFAULT_GRADIENTS,
}: Props) {
  const handleSelect = useCallback(
    (value: string) => onSelect(value),
    [onSelect]
  );

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-neutral-700">{label}</p>

      {/* COLORES */}
      <div className="grid grid-cols-6 gap-2">
        {colors.map((c) => {
          const isSelected = selected === c;

          return (
            <button
              key={c}
              onClick={() => handleSelect(c)}
              aria-label={`Seleccionar color ${c}`}
              className={`h-7 w-7 rounded-full border shadow-sm hover:scale-105 transition relative
                ${isSelected ? "ring-2 ring-neutral-800 ring-offset-1" : ""}`}
              style={{ background: c }}
            />
          );
        })}
      </div>

      {/* GRADIENTES */}
      <p className="text-sm mt-4 font-medium text-neutral-700">Gradientes</p>
      <div className="grid grid-cols-3 gap-2">
        {gradients.map((g) => {
          const isSelected = selected === g;

          return (
            <button
              key={g}
              onClick={() => handleSelect(g)}
              aria-label="Seleccionar gradiente"
              className={`h-10 rounded-lg shadow-sm border hover:scale-105 transition
                ${isSelected ? "ring-2 ring-neutral-800 ring-offset-1" : ""}`}
              style={{ background: g }}
            />
          );
        })}
      </div>

      {/* COLOR PICKER AVANZADO */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="color"
          className="w-10 h-10 rounded cursor-pointer border"
          value={selected?.startsWith("#") ? selected : "#000000"}
          onChange={(e) => handleSelect(e.target.value)}
        />
        <span className="text-sm text-neutral-600">Elegir color exacto</span>
      </div>
    </div>
  );
}

export default memo(ColorPicker);
