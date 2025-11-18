"use client";

import { DayBlock } from "@/types/DayBlock";
import { useState, useEffect } from "react";

interface Props {
  block: DayBlock | null;
  onUpdate: (b: DayBlock) => void;
}

export default function InspectorPanel({ block, onUpdate }: Props) {
  const [local, setLocal] = useState<DayBlock | null>(null);
  const [open, setOpen] = useState(true);

  // Cuando seleccionas un bloque → lo cargamos y abrimos el panel
  useEffect(() => {
    setLocal(block);
    if (block) setOpen(true);
  }, [block]);

  if (!local || !open) {
    return (
      <div className="p-6 text-neutral-500">
        {open ? "Selecciona un bloque para editarlo" : ""}
      </div>
    );
  }

  function update<K extends keyof DayBlock>(key: K, value: DayBlock[K]) {
  if (!local) return;

  const updated: DayBlock = {
    ...local,
    [key]: value,

    // Obligatorio: garantizar estos campos
    id: local.id,
    type: local.type,
    content: local.content ?? "",
    x: local.x ?? 0,
    y: local.y ?? 0,
  };

  setLocal(updated);
  onUpdate(updated);
}

  return (
    <div
      className="
      relative
      p-5 space-y-6
      text-sm select-none
      h-full
      overflow-y-auto
      animate-[fadeIn_0.25s_ease]
    "
    >
      {/* ❌ Cerrar */}
      <button
        onClick={() => setOpen(false)}
        className="
          absolute top-3 right-3
          w-6 h-6 flex items-center justify-center
          text-neutral-500 hover:text-black
          rounded-full hover:bg-neutral-200
          transition
        "
      >
        ✕
      </button>

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">{local.type.toUpperCase()}</h2>
        <p className="text-neutral-400 text-xs">{local.id}</p>
      </div>

      {/* ====================== TEXTO ======================= */}
      {(local.type === "text" || local.type === "title") && (
        <Section title="Texto">
          <Row label="Tamaño">
            <input
              type="range"
              min={10}
              max={80}
              value={local.fontSize || 16}
              onChange={(e) => update("fontSize", Number(e.target.value))}
            />
            <span>{local.fontSize}px</span>
          </Row>

          <Row label="Color">
            <input
              type="color"
              value={local.color || "#000000"}
              onChange={(e) => update("color", e.target.value)}
              className="w-8 h-8 rounded"
            />
          </Row>

          <Row label="Alineación">
            <div className="flex gap-1">
              {["left", "center", "right"].map((align) => (
                <button
                  key={align}
                  onClick={() => update("textAlign", align as any)}
                  className={`px-2 py-1 rounded border text-xs ${
                    local.textAlign === align
                      ? "bg-neutral-800 text-white"
                      : "bg-white"
                  }`}
                >
                  {align[0].toUpperCase()}
                </button>
              ))}
            </div>
          </Row>
        </Section>
      )}

      {/* ====================== FONDO ======================= */}
      <Section title="Fondo">
        <Row label="Color">
          <input
            type="color"
            value={local.backgroundColor || "#ffffff"}
            onChange={(e) => update("backgroundColor", e.target.value)}
            className="w-8 h-8 rounded"
          />
        </Row>

        <Row label="Opacidad">
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={local.opacity ?? 1}
            onChange={(e) => update("opacity", Number(e.target.value))}
          />
        </Row>
      </Section>

      {/* ====================== ROTACIÓN ======================= */}
      <Section title="Rotación">
        <Row label="Rotación">
          <input
            type="range"
            min={0}
            max={360}
            value={local.rotation || 0}
            onChange={(e) => update("rotation", Number(e.target.value))}
          />
          <span>{local.rotation}°</span>
        </Row>
      </Section>

      {/* ====================== BORDES ======================= */}
      <Section title="Bordes">
        <Row label="Radio">
          <input
            type="range"
            min={0}
            max={50}
            value={local.borderRadius ?? 6}
            onChange={(e) => update("borderRadius", Number(e.target.value))}
          />
        </Row>

        <Row label="Grosor">
          <input
            type="range"
            min={0}
            max={10}
            value={local.borderWidth ?? 0}
            onChange={(e) => update("borderWidth", Number(e.target.value))}
          />
        </Row>

        <Row label="Color">
          <input
            type="color"
            value={local.borderColor || "#000000"}
            onChange={(e) => update("borderColor", e.target.value)}
            className="w-8 h-8 rounded"
          />
        </Row>
      </Section>

      {/* ====================== CAPAS ======================= */}
      <Section title="Capas">
        <div className="flex gap-2">
          <button
            onClick={() => update("zIndex", (local.zIndex || 1) + 1)}
            className="flex-1 p-2 bg-neutral-800 text-white rounded text-xs"
          >
            ↑ Frente
          </button>
          <button
            onClick={() => update("zIndex", (local.zIndex || 1) - 1)}
            className="flex-1 p-2 bg-neutral-400 text-white rounded text-xs"
          >
            ↓ Fondo
          </button>
        </div>
      </Section>
    </div>
  );
}

/* --------------------- MINI COMPONENTES ---------------------- */

function Section({ title, children }: any) {
  return (
    <div className="space-y-2 border-b pb-3">
      <h3 className="font-medium text-neutral-700">{title}</h3>
      {children}
    </div>
  );
}

function Row({ label, children }: any) {
  return (
    <div className="flex justify-between items-center gap-3">
      <span className="text-neutral-500">{label}</span>
      {children}
    </div>
  );
}
