"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
  compact?: boolean;  // modo icon-only
}

export default function ToolbarButton({
  icon,
  label,
  onClick,
  selected = false,
  disabled = false,
  compact = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "relative group flex items-center gap-2 rounded-lg transition-all",
        "text-sm font-medium select-none",
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "cursor-pointer active:scale-[0.97]",
        selected
          ? "bg-blue-600 text-white shadow-md"
          : "bg-neutral-100 hover:bg-neutral-200",
        compact ? "px-2 py-2 justify-center" : "px-3 py-2 w-full"
      )}
    >
      {/* ICONO */}
      <span className={clsx("text-xl", selected && "text-white")}>
        {icon}
      </span>

      {/* LABEL (si NO es modo compacto) */}
      {!compact && <span className="truncate">{label}</span>}

      {/* TOOLTIP PROFESIONAL */}
      {compact && (
        <span
          className="
            pointer-events-none
            absolute left-1/2 top-full mt-2 
            -translate-x-1/2 scale-0 group-hover:scale-100 
            bg-black text-white text-xs px-2 py-1 rounded-md 
            whitespace-nowrap shadow-lg transition-all origin-top
          "
        >
          {label}
        </span>
      )}
    </button>
  );
}
