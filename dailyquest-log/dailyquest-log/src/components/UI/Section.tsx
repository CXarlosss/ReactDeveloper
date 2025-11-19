"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;

  // estilo general
  variant?: "default" | "bordered" | "ghost" | "soft";
  dense?: boolean;

  className?: string;

  // acciones en la cabecera
  rightAction?: ReactNode;
}

export default function Section({
  title,
  description,
  children,
  variant = "default",
  dense = false,
  className,
  rightAction,
}: SectionProps) {
  const spacing = dense ? "space-y-1" : "space-y-2";

  const variantClasses = {
    default: "",
    ghost: "",
    bordered: "border border-neutral-200 rounded-lg p-4",
    soft: "bg-neutral-50 border border-neutral-200 rounded-lg p-4",
  };

  return (
    <section className={clsx("w-full", variantClasses[variant], spacing, className)}>
      
      {/* HEADER */}
      {(title || rightAction) && (
        <div className="flex items-center justify-between mb-1">
          {title && (
            <h2 className={clsx(
              "font-semibold text-neutral-800",
              dense ? "text-sm" : "text-base"
            )}>
              {title}
            </h2>
          )}

          {rightAction && <div className="flex-shrink-0">{rightAction}</div>}
        </div>
      )}

      {/* DESCRIPTION */}
      {description && (
        <p className={clsx(
          "text-neutral-500 leading-snug",
          dense ? "text-[11px]" : "text-sm"
        )}>
          {description}
        </p>
      )}

      <div className={clsx("text-neutral-800", dense && "text-sm")}>
        {children}
      </div>

    </section>
  );
}
