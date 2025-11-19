"use client";

import { useState } from "react";
import clsx from "clsx";

interface Props {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  allowAlpha?: boolean; // Para rgba más adelante
  showLabel?: boolean;
}

export default function ColorInput({
  label,
  value,
  onChange,
  allowAlpha = false,
  showLabel = true,
}: Props) {
  const [textValue, setTextValue] = useState(value);

  function handleInput(v: string) {
    setTextValue(v);
    onChange(v);
  }

  return (
    <div className="flex items-center gap-2 w-full">

      {/* ETIQUETA OPCIONAL */}
      {showLabel && label && (
        <span className="text-xs text-neutral-500 w-16">{label}</span>
      )}

      {/* COLOR PICKER */}
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          className="
            w-8 h-8 rounded border cursor-pointer
            hover:scale-105 transition
          "
        />
      </div>

      {/* INPUT TEXT (MANUAL) */}
      <input
        type="text"
        value={textValue}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="#000000 o rgba()"
        className="
          flex-1 px-2 py-1 text-xs border rounded
          bg-white focus:border-neutral-400 outline-none
        "
      />
    </div>
  );
}
