"use client";

import { ReactNode, memo } from "react";
import clsx from "clsx";

interface Props {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
  compact?: boolean; // modo icon-only
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
}

function ToolbarButton({
  icon,
  label,
  onClick,
  selected = false,
  disabled = false,
  compact = false,
  variant = "default",
  size = "md",
}: Props) {
  const handleClick = () => {
    if (!disabled) onClick();
  };

  const sizeClasses = {
    sm: compact ? "px-2 py-1.5 text-sm" : "px-3 py-1.5 text-sm",
    md: compact ? "px-2.5 py-2 text-base" : "px-3 py-2 text-base",
    lg: compact ? "px-3 py-3 text-lg" : "px-4 py-3 text-lg",
  };

  const variantClasses = {
    default: selected
      ? "bg-neutral-800 text-white shadow-sm"
      : "bg-neutral-100 hover:bg-neutral-200",
    primary: selected
      ? "bg-blue-600 text-white shadow-md"
      : "bg-blue-500 text-white hover:bg-blue-600",
    ghost: selected
      ? "bg-neutral-200"
      : "hover:bg-neutral-100 bg-transparent",
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-pressed={selected}
      className={clsx(
        "relative group flex items-center gap-2 rounded-lg transition-all select-none",
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "cursor-pointer active:scale-[0.97]",
        variantClasses[variant],
        sizeClasses[size],
        compact && "justify-center w-full"
      )}
    >
      {/* ICONO */}
      <span className={clsx("text-xl leading-none", selected && "text-white")}>
        {icon}
      </span>

      {/* LABEL */}
      {!compact && (
        <span className="truncate font-medium whitespace-nowrap">{label}</span>
      )}

      {/* TOOLTIP ICON-ONLY */}
      {compact && (
        <span
          className="
            pointer-events-none absolute left-1/2 top-full mt-2 
            -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 
            group-hover:scale-100 bg-black text-white text-xs 
            px-2 py-1 rounded-md whitespace-nowrap shadow-lg 
            transition-all duration-150 origin-top
          "
        >
          {label}
        </span>
      )}
    </button>
  );
}

export default memo(ToolbarButton);
