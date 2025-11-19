"use client";

import { DayBlock } from "@/types/DayBlock";
import Section from "../ui/Section";
import Row from "../ui/Row";
import Slider from "../ui/Slider";

interface Props {
  block: DayBlock;
  onUpdate: (cambios: Partial<DayBlock>) => void;
}

export default function ImageSection({ block, onUpdate }: Props) {
  return (
    <Section title="Imagen">
      
      {/* Modo de ajuste */}
      <Row label="Ajuste">
        <select
          value={block.objectFit || "cover"}
          onChange={(e) => onUpdate({ objectFit: e.target.value as any })}
          className="px-2 py-1 border rounded text-sm w-full bg-white"
        >
          <option value="cover">Cubrir (recorta)</option>
          <option value="contain">Contener</option>
          <option value="fill">Estirar</option>
        </select>
      </Row>

      {/* Radio del borde */}
      <Row label="Radio">
        <div className="flex items-center gap-2 w-full">
          <Slider
            min={0}
            max={40}
            value={block.borderRadius ?? 8}
            onChange={(v) => onUpdate({ borderRadius: v })}
          />
          <span className="text-xs text-neutral-500 w-6">
            {block.borderRadius ?? 8}px
          </span>
        </div>
      </Row>

      {/* Opacidad */}
      <Row label="Opacidad">
        <div className="flex items-center gap-2 w-full">
          <Slider
            min={0.1}
            max={1}
            step={0.05}
            value={block.opacity ?? 1}
            onChange={(v) => onUpdate({ opacity: v })}
          />
          <span className="text-xs text-neutral-500 w-8">
            {(block.opacity ?? 1) * 100}%
          </span>
        </div>
      </Row>

    </Section>
  );
}
