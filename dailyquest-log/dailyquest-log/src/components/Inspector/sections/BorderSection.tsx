"use client";

import { DayBlock } from "@/types/DayBlock";
import Section from "../ui/Section";
import Row from "../ui/Row";
import ColorInput from "../ui/ColorInput";
import Slider from "../ui/Slider";

interface Props {
  block: DayBlock;
  onUpdate: (cambios: Partial<DayBlock>) => void;
}

export default function BorderSection({ block, onUpdate }: Props) {
  return (
    <Section title="Bordes">
      
      {/* Grosor */}
      <Row label="Grosor">
        <div className="flex items-center gap-2 w-full">
          <Slider
            min={0}
            max={12}
            value={block.borderWidth ?? 0}
            onChange={(v) => onUpdate({ borderWidth: v })}
          />
          <span className="text-xs text-neutral-500 w-6">
            {block.borderWidth ?? 0}px
          </span>
        </div>
      </Row>

      {/* Color */}
      <Row label="Color">
        <ColorInput
          value={block.borderColor || "#000000"}
          onChange={(color) => onUpdate({ borderColor: color })}
        />
      </Row>

      {/* Radio */}
      <Row label="Radio">
        <div className="flex items-center gap-2 w-full">
          <Slider
            min={0}
            max={48}
            value={block.borderRadius ?? 6}
            onChange={(v) => onUpdate({ borderRadius: v })}
          />
          <span className="text-xs text-neutral-500 w-6">
            {block.borderRadius ?? 6}px
          </span>
        </div>
      </Row>

      {/* Estilo de borde — futuro */}
      {/* 
      <Row label="Estilo">
        <select
          value={block.borderStyle || "solid"}
          onChange={(e) => onUpdate({ borderStyle: e.target.value as any })}
          className="px-2 py-1 border rounded text-sm"
        >
          <option value="solid">Sólido</option>
          <option value="dashed">Guiones</option>
          <option value="dotted">Punteado</option>
        </select>
      </Row>
      */}

    </Section>
  );
}
