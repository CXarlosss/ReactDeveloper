"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <div className="border-b border-neutral-200 pb-3 mb-3">
      {/* TÍTULO */}
      <h3 className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wide mb-2">
        {title}
      </h3>

      {/* CONTENIDO */}
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}
