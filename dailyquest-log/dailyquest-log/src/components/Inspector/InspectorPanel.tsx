"use client";

import { DayBlock } from "@/types/DayBlock";

import Section from "./ui/Section";
import TextSection from "./sections/TextSection";
import BackgroundSection from "./sections/BackgroundSection";
import BorderSection from "./sections/BorderSection";
import LayoutSection from "./sections/LayoutSection";
import LayerSection from "./sections/LayerSection";
import ShapeSection from "./sections/ShapeSection";
import ImageSection from "./sections/ImageSection";

interface Props {
  block: DayBlock | null;
  onUpdate: (updated: DayBlock) => void;
}

export default function InspectorPanel({ block, onUpdate }: Props) {
  if (!block) return null;

  // ---- función interna para aplicar patches ----
  function apply(patch: Partial<DayBlock>) {
    if (!block) return; // 🔒 evita el error 18047

    onUpdate({
      ...block,
      ...patch,
      id: block.id,         // 🔒 ID siempre fijo
      type: block.type,     // 🔒 TYPE siempre fijo
    });
  }

  return (
    <div className="w-80 p-4 space-y-6 bg-white border rounded-xl shadow-xl">
      <p className="text-sm font-semibold text-neutral-600">Inspector</p>
      <p className="text-xs text-neutral-400">ID: {block.id}</p>

      {/* SECCIONES DEPENDIENDO DEL TIPO */}
      {(block.type === "text" || block.type === "title") && (
        <TextSection block={block} onUpdate={apply} />
      )}

      {block.type === "image" && (
        <ImageSection block={block} onUpdate={apply} />
      )}

      {/* SECCIONES GENERALES */}
      <BackgroundSection block={block} onUpdate={apply} />
      <BorderSection block={block} onUpdate={apply} />
      <LayoutSection block={block} onUpdate={apply} />
      <LayerSection block={block} onUpdate={apply} />
      <ShapeSection block={block} onUpdate={apply} />
    </div>
  );
}
