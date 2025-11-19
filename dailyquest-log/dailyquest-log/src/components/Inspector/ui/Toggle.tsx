"use client";

import clsx from "clsx";

interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}

export default function Toggle({ checked, onChange, label }: Props) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      
      {/* SWITCH */}
      <div
        onClick={() => onChange(!checked)}
        className={clsx(
          "w-10 h-5 rounded-full transition-colors relative",
          checked ? "bg-neutral-800" : "bg-neutral-300"
        )}
      >
        <div
          className={clsx(
            "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>

      {/* LABEL */}
      {label && <span className="text-xs text-neutral-600">{label}</span>}
    </label>
  );
}
