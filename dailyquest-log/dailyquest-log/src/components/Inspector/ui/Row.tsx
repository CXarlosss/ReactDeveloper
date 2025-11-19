"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  label?: string;        // Texto de la izquierda
  children: ReactNode;   // Controles a la derecha
  alignTop?: boolean;    // Para inputs altos
}

export default function Row({ label, children, alignTop = false }: Props) {
  return (
    <div
      className={clsx(
        "flex w-full gap-3 py-1",
        alignTop ? "items-start" : "items-center"
      )}
    >
      {/* LABEL */}
      {label && (
        <span className="text-xs text-neutral-500 w-24 shrink-0">
          {label}
        </span>
      )}

      {/* CONTENIDO */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
