"use client";

import clsx from "clsx";

interface Props {
  label?: string;         // texto opcional delante (X, Y, W, H…)
  value: number;          // siempre number
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  full?: boolean;         // si este input debe ocupar toda la fila
}

export default function NumberInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  full = false,
}: Props) {
  return (
    <div
      className={clsx(
        "flex items-center bg-white border rounded px-2 py-1",
        full ? "w-full" : "w-auto"
      )}
    >
      {/* Etiqueta (ej: X, Y, W, H) */}
      {label && (
        <span className="text-[10px] text-neutral-500 w-4 mr-1">
          {label}
        </span>
      )}

      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-full text-xs outline-none bg-transparent
          appearance-none
        "
      />
    </div>
  );
}
