"use client";

import { DayBlock } from "@/types/DayBlock";
import Section from "../ui/Section";
import Row from "../ui/Row";
import Slider from "../ui/Slider";

interface Props {
  block: DayBlock;
  onUpdate: (cambios: Partial<DayBlock>) => void;
}

const SHAPES = [
  { id: "rectangle", label: "Rectángulo" },
  { id: "rounded", label: "Redondeado" },
  { id: "circle", label: "Círculo" },
  { id: "note", label: "Nota" },
];

export default function ShapeSection({ block, onUpdate }: Props) {
  return (
    <Section title="Forma">

      {/* Tipo de forma */}
      <Row label="Tipo">
        <select
          value={block.shapeType || "rectangle"}
          onChange={(e) =>
            onUpdate({
              shapeType: e.target.value as DayBlock["shapeType"],
              borderRadius:
                e.target.value === "circle"
                  ? (block.width ?? 200) / 2 // auto round circle
                  : block.borderRadius ?? 8,
            })
          }
          className="px-2 py-1 border rounded text-sm bg-white"
        >
          {SHAPES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </Row>

      {/* Color de fondo */}
      <Row label="Fondo">
        <input
          type="color"
          value={block.backgroundColor ?? "#ffffff"}
          onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
          className="w-8 h-8 rounded border"
        />
      </Row>

      {/* Gradiente */}
      <Row label="Gradiente">
        <input
          type="text"
          placeholder="linear-gradient(...)"
          className="w-full text-xs px-2 py-1 border rounded"
          value={block.backgroundGradient ?? ""}
          onChange={(e) => onUpdate({ backgroundGradient: e.target.value })}
        />
      </Row>

      {/* Border radius (solo si no es círculo) */}
      {block.shapeType !== "circle" && (
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
      )}

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
