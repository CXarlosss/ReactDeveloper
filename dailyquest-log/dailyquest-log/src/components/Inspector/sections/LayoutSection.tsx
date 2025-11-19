"use client";

import { DayBlock } from "@/types/DayBlock";
import Section from "../ui/Section";
import Row from "../ui/Row";

interface Props {
  block: DayBlock;
  onUpdate: (cambios: Partial<DayBlock>) => void;
}

export default function LayoutSection({ block, onUpdate }: Props) {
  return (
    <Section title="Layout">

      {/* POSICIÓN */}
      <Row label="Posición">
        <div className="grid grid-cols-2 gap-2 w-full">
          <NumberInput
            label="X"
            value={block.x}
            onChange={(v) => onUpdate({ x: v })}
          />
          <NumberInput
            label="Y"
            value={block.y}
            onChange={(v) => onUpdate({ y: v })}
          />
        </div>
      </Row>

      {/* TAMAÑO */}
      <Row label="Tamaño">
        <div className="grid grid-cols-2 gap-2 w-full">
          <NumberInput
            label="W"
            value={block.width ?? 200}
            onChange={(v) => onUpdate({ width: v })}
          />
          <NumberInput
            label="H"
            value={block.height ?? 100}
            onChange={(v) => onUpdate({ height: v })}
          />
        </div>
      </Row>

      {/* ROTACIÓN */}
      <Row label="Rotación">
        <div className="flex items-center gap-2 w-full">
          <NumberInput
            label="°"
            value={block.rotation ?? 0}
            onChange={(v) => onUpdate({ rotation: v })}
          />
        </div>
      </Row>

      {/* RESET */}
      <Row label="Reset">
        <button
          className="w-full text-xs py-1 bg-neutral-200 rounded hover:bg-neutral-300 transition"
          onClick={() =>
            onUpdate({
              x: 100,
              y: 100,
              width: 200,
              height: 100,
              rotation: 0,
            })
          }
        >
          Restaurar valores
        </button>
      </Row>
    </Section>
  );
}

/* ---------------------------------- */
/*       NumberInput reutilizable     */
/* ---------------------------------- */

interface NumInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

function NumberInput({ label, value, onChange }: NumInputProps) {
  return (
    <div className="flex items-center bg-white border rounded px-2 py-1">
      <span className="text-[10px] text-neutral-500 w-4">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full text-xs outline-none"
      />
    </div>
  );
}
