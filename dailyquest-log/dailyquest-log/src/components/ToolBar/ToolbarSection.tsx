"use client";

import { ReactNode, useState } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Props {
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  dense?: boolean;
}

export default function ToolbarSection({
  title,
  children,
  collapsible = true,
  defaultOpen = true,
  dense = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      {/* HEADER */}
      <button
        onClick={() => collapsible && setOpen(!open)}
        className={clsx(
          "flex items-center justify-between w-full",
          "text-xs font-semibold text-neutral-500",
          "uppercase tracking-wide select-none",
          dense ? "px-1 py-1" : "px-2 py-1",
          "hover:text-neutral-700 transition"
        )}
      >
        <span>{title}</span>

        {collapsible && (
          <span className="transition-transform">
            {open ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </span>
        )}
      </button>

      {/* BODY */}
      <div
        className={clsx(
          "overflow-hidden transition-all",
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={clsx(dense ? "space-y-1" : "space-y-2", "px-1 pt-1")}>
          {children}
        </div>
      </div>
    </div>
  );
}
