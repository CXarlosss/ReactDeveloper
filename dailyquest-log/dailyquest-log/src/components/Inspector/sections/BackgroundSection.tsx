"use client";

import { DayBlock } from "@/types/DayBlock";
import Section from "../ui/Section";
import Row from "../ui/Row";
import ColorInput from "../ui/ColorInput";
import Slider from "../ui/Slider";

interface Props {
  block: DayBlock;
  onUpdate: (changes: Partial<DayBlock>) => void;
}

export default function BackgroundSection({ block, onUpdate }: Props) {
  return (
    <Section title="Fondo">
      {/* Color de fondo */}
      <Row label="Color">
        <ColorInput
          value={block.backgroundColor || "#ffffff"}
          onChange={(color) => onUpdate({ backgroundColor: color })}
        />
      </Row>

      {/* Opacidad */}
      <Row label="Opacidad">
        <div className="flex items-center gap-2 w-full">
          <Slider
            min={0}
            max={1}
            step={0.05}
            value={block.opacity ?? 1}
            onChange={(v) => onUpdate({ opacity: v })}
          />
          <span className="text-xs text-neutral-500 w-8">
            {(block.opacity ?? 1).toFixed(2)}
          </span>
        </div>
      </Row>

      {/* Esquinas redondeadas */}
      <Row label="Bordes">
        <Slider
          min={0}
          max={48}
          value={block.borderRadius ?? 6}
          onChange={(v) => onUpdate({ borderRadius: v })}
        />
      </Row>

      {/* Sombra */}
      <Row label="Sombra">
        <input
          type="text"
          value={block.boxShadow || ""}
          onChange={(e) => onUpdate({ boxShadow: e.target.value })}
          placeholder="e.g. 0px 4px 12px rgba(0,0,0,0.15)"
          className="w-full px-2 py-1 border rounded text-xs"
        />
      </Row>

      {/* Degradado */}
      <Row label="Gradiente">
        <input
          type="text"
          value={block.backgroundGradient || ""}
          onChange={(e) => onUpdate({ backgroundGradient: e.target.value })}
          placeholder="linear-gradient(135deg, #fff, #ddd)"
          className="w-full px-2 py-1 border rounded text-xs"
        />
      </Row>
    </Section>
  );
}
