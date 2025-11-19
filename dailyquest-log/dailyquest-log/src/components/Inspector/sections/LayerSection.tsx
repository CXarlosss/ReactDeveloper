"use client";

import { DayBlock } from "@/types/DayBlock";
import Section from "../ui/Section";
import Row from "../ui/Row";

interface Props {
  block: DayBlock;
  onUpdate: (cambios: Partial<DayBlock>) => void;
}

export default function LayerSection({ block, onUpdate }: Props) {
  const currentZ = block.zIndex ?? 1;

  return (
    <Section title="Capas">
      <Row label="Orden">
        <div className="flex items-center gap-2 w-full">
          
          {/* Subir una capa */}
          <button
            onClick={() => onUpdate({ zIndex: currentZ + 1 })}
            className="flex-1 px-2 py-1 bg-neutral-800 text-white rounded text-xs hover:bg-neutral-900 transition"
          >
            ↑ Frente
          </button>

          {/* Bajar una capa */}
          <button
            onClick={() => onUpdate({ zIndex: Math.max(currentZ - 1, 0) })}
            className="flex-1 px-2 py-1 bg-neutral-400 text-white rounded text-xs hover:bg-neutral-500 transition"
          >
            ↓ Fondo
          </button>
        </div>
      </Row>

      <Row label="Ir a…">
        <div className="flex items-center gap-2 w-full">

          {/* Al frente absoluto */}
          <button
            onClick={() => onUpdate({ zIndex: 999 })}
            className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
          >
            Traer delante
          </button>

          {/* Al fondo absoluto */}
          <button
            onClick={() => onUpdate({ zIndex: 0 })}
            className="flex-1 px-2 py-1 bg-neutral-300 text-neutral-700 rounded text-xs hover:bg-neutral-400 transition"
          >
            Enviar atrás
          </button>
        </div>
      </Row>

      <Row label="Actual">
        <span className="text-xs text-neutral-600">{currentZ}</span>
      </Row>
    </Section>
  );
}
