"use client";

import { DayBlock } from "@/types/DayBlock";
import Section from "../ui/Section";
import Row from "../ui/Row";
import Slider from "../ui/Slider";

interface Props {
  block: DayBlock;
  onUpdate: (c: Partial<DayBlock>) => void;
}

const FONTS = [
  "Inter", 
  "Arial", 
  "Georgia", 
  "Times New Roman", 
  "Courier New", 
  "JetBrains Mono",
];

export default function TextSection({ block, onUpdate }: Props) {
  return (
    <Section title="Texto">

      {/* Tamaño */}
      <Row label="Tamaño">
        <div className="flex items-center gap-2 w-full">
          <Slider
            min={10}
            max={80}
            value={block.fontSize ?? 16}
            onChange={(v) => onUpdate({ fontSize: v })}
          />
          <span className="text-xs text-neutral-500 w-8">
            {block.fontSize ?? 16}px
          </span>
        </div>
      </Row>

      {/* Familia */}
      <Row label="Tipografía">
        <select
          value={block.fontFamily ?? "Inter"}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
          className="px-2 py-1 border rounded text-sm w-full bg-white"
        >
          {FONTS.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>
              {f}
            </option>
          ))}
        </select>
      </Row>

      {/* Peso */}
      <Row label="Peso">
        <select
          value={block.fontWeight ?? "normal"}
          onChange={(e) =>
            onUpdate({ fontWeight: e.target.value as "normal" | "bold" })
          }
          className="px-2 py-1 border rounded text-sm w-full bg-white"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </select>
      </Row>

      {/* Estilo */}
      <Row label="Estilo">
        <div className="flex gap-1">
          <FormatButton
            active={block.fontStyle === "italic"}
            label="I"
            onClick={() =>
              onUpdate({ fontStyle: block.fontStyle === "italic" ? "normal" : "italic" })
            }
          />
          <FormatButton
            active={block.textDecoration === "underline"}
            label="U"
            onClick={() =>
              onUpdate({
                textDecoration:
                  block.textDecoration === "underline" ? "none" : "underline",
              })
            }
          />
          <FormatButton
            active={block.textDecoration === "line-through"}
            label="S"
            onClick={() =>
              onUpdate({
                textDecoration:
                  block.textDecoration === "line-through"
                    ? "none"
                    : "line-through",
              })
            }
          />
        </div>
      </Row>

      {/* Alineación */}
      <Row label="Alineación">
        <div className="flex gap-1 w-full">
          {(["left", "center", "right"] as const).map((align) => (
            <AlignButton
              key={align}
              label={align[0].toUpperCase()}
              selected={block.textAlign === align}
              onClick={() => onUpdate({ textAlign: align })}
            />
          ))}
        </div>
      </Row>

      {/* Line Height */}
      <Row label="Interlineado">
        <div className="flex items-center gap-2 w-full">
          <Slider
            min={0.8}
            max={2}
            step={0.05}
            value={block.lineHeight ?? 1.4}
            onChange={(v) => onUpdate({ lineHeight: v })}
          />
          <span className="text-xs text-neutral-500 w-8">
            {block.lineHeight ?? 1.4}
          </span>
        </div>
      </Row>

      {/* Letter spacing */}
      <Row label="Espaciado">
        <div className="flex items-center gap-2 w-full">
          <Slider
            min={-2}
            max={10}
            step={0.5}
            value={block.letterSpacing ?? 0}
            onChange={(v) => onUpdate({ letterSpacing: v })}
          />
          <span className="text-xs text-neutral-500 w-10">
            {block.letterSpacing ?? 0}px
          </span>
        </div>
      </Row>

      {/* Color */}
      <Row label="Color">
        <input
          type="color"
          value={block.color ?? "#000000"}
          onChange={(e) => onUpdate({ color: e.target.value })}
          className="w-8 h-8 rounded border"
        />
      </Row>

    </Section>
  );
}

/* -------------------- UI Buttons -------------------- */

function FormatButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`px-2 py-1 border rounded text-xs ${
        active ? "bg-neutral-800 text-white" : "bg-white"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function AlignButton({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`px-2 py-1 border rounded text-xs ${
        selected ? "bg-neutral-800 text-white" : "bg-white"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
