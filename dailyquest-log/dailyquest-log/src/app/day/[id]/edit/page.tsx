"use client";

import { useEffect, useState } from "react";
import { DayBlock } from "@/types/DayBlock";
import { Toolbar } from "@/components/ToolBar";
import MuralCanvas from "@/components/MuralCanva";
import InspectorPanel from "@/components/Inspector/InspectorPanel";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditDayPage({ params }: Props) {
  const router = useRouter();

  const [dayId, setDayId] = useState<number | null>(null);
  const [blocks, setBlocks] = useState<DayBlock[]>([]);
  const [loading, setLoading] = useState(true);

  // 👉 Nuevo: bloque actualmente en edición
  const [inspectorBlock, setInspectorBlock] = useState<DayBlock | null>(null);
  const [inspectorPos, setInspectorPos] = useState({ x: 100, y: 100 });

  useEffect(() => {
    (async () => {
      const { id } = await params;
      setDayId(Number(id));
    })();
  }, [params]);

  useEffect(() => {
    if (!dayId) return;

    async function load() {
      const res = await fetch(`/api/days/${dayId}`);
      const data = await res.json();
      setBlocks(data.blocks || []);
      setLoading(false);
    }

    load();
  }, [dayId]);

  function addBlock(block: DayBlock) {
    setBlocks(prev => [...prev, block]);
  }

  function updateBlock(updated: DayBlock) {
    setBlocks(prev => prev.map(b => b.id === updated.id ? updated : b));

    if (inspectorBlock && inspectorBlock.id === updated.id) {
      setInspectorBlock(updated); // actualizar inspector activo
    }
  }

  // 👉 llamado desde MuralCanvas cuando haces doble click
  function openInspector(block: DayBlock, x: number, y: number) {
    setInspectorBlock(block);
    setInspectorPos({ x, y });
  }

  async function saveDay() {
    if (!dayId) return;
    await fetch(`/api/days/${dayId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks })
    });
    router.push(`/day/${dayId}`);
  }

  if (loading) {
    return <p className="p-10 text-lg">Cargando…</p>;
  }

  return (
    <div className="w-full h-screen overflow-hidden flex bg-neutral-100">

      <div className="w-[260px] border-r bg-white shadow-md z-50">
        <Toolbar onAddBlock={addBlock} />
      </div>

      <div className="flex-1 overflow-scroll p-10 bg-neutral-200">
        <div className="flex justify-center">
          <MuralCanvas
            blocks={blocks}
            onChange={updateBlock}
            onOpenInspector={openInspector}   // 👈 importante
          />
        </div>
      </div>

      {/* 👉 Inspector flotante solo cuando hace falta */}
      {inspectorBlock && (
        <div
          className="absolute bg-white shadow-2xl border rounded-xl z-[999]"
          style={{
            left: inspectorPos.x + 20,
            top: inspectorPos.y + 20
          }}
        >
          <InspectorPanel
            block={inspectorBlock}
            onUpdate={updateBlock}
          />
        </div>
      )}

      <button
        onClick={saveDay}
        className="fixed bottom-6 right-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-xl"
      >
        Guardar
      </button>
    </div>
  );
}
