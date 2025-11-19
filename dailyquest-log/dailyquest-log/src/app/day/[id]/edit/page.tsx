"use client";

import { useEffect, useState } from "react";
import { DayBlock } from "@/types/DayBlock";
import { Toolbar } from "@/components/ToolBar";
import Canvas from "@/components/editor/Canvas";
import InspectorPanel from "@/components/inspector/InspectorPanel";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditDayPage({ params }: Props) {
  const router = useRouter();

  const [dayId, setDayId] = useState<number | null>(null);
  const [blocks, setBlocks] = useState<DayBlock[]>([]);
  const [loading, setLoading] = useState(true);

  // 👉 selección activa en el canvas
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 👉 inspector actual
  const [inspectorBlock, setInspectorBlock] = useState<DayBlock | null>(null);
  const [inspectorPos, setInspectorPos] = useState({ x: 100, y: 100 });

  // obtener ID del día
  useEffect(() => {
    (async () => {
      const { id } = await params;
      setDayId(Number(id));
    })();
  }, [params]);

  // cargar bloques
  useEffect(() => {
    if (!dayId) return;

    async function load() {
      const res = await fetch(`/api/days/${dayId}`);
      const data = await res.json();
      setBlocks(data.blocks || []);
      console.log("📦 BLOQUES CARGADOS DESDE API:", data.blocks);
console.log("📦 STATE BLOQUES:", blocks);
      setLoading(false);
    }

    load();
  }, [dayId]);

  // añadir un bloque nuevo
function addBlock(block: DayBlock) {
  const canvas = document.querySelector(".canvas-area");

  if (!canvas) {
    console.warn("⚠ No se encontró el canvas");
    return;
  }

  // Tamaño del viewport visible
  const viewW = canvas.clientWidth;
  const viewH = canvas.clientHeight;

  // Scroll actual dentro del canvas
  const scrollX = canvas.scrollLeft;
  const scrollY = canvas.scrollTop;

  // Centro real donde está mirando el usuario
  const centerX = scrollX + viewW / 2;
  const centerY = scrollY + viewH / 2;

  const centered = {
    ...block,
    x: centerX - 100, // ajusta para centrar el RND
    y: centerY - 50,
  };

  setBlocks(prev => [...prev, centered]);
  setSelectedId(centered.id); 
}



  // actualizar un bloque
  function updateBlock(updated: DayBlock) {
    setBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));

    if (inspectorBlock && inspectorBlock.id === updated.id) {
      setInspectorBlock(updated);
    }
  }

  // abrir el inspector en click derecho
  function openInspector(block: DayBlock, x: number, y: number) {
    setInspectorBlock(block);
    setInspectorPos({ x, y });
    setSelectedId(block.id);
  }

  async function saveDay() {
    if (!dayId) return;

    await fetch(`/api/days/${dayId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
    });

    router.push(`/day/${dayId}`);
  }

  if (loading) {
    return <p className="p-10 text-lg">Cargando…</p>;
  }

 return (
  <div className="w-full h-screen overflow-hidden flex bg-neutral-100">

    {/* TOOLBAR IZQUIERDA */}
    <div className="w-[260px] border-r bg-white shadow-md z-50">
      <Toolbar onAddBlock={addBlock} />
    </div>

    {/* CANVAS CENTRAL */}
    <div className="canvas-area flex-1 relative overflow-scroll bg-neutral-200">
      <Canvas
        blocks={blocks}
        onChange={updateBlock}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        onOpenInspector={openInspector}
      />
    </div>

    {/* INSPECTOR A LA DERECHA */}
    {inspectorBlock && (
      <div className="w-[320px] border-l bg-white shadow-xl overflow-y-auto">
        <InspectorPanel block={inspectorBlock} onUpdate={updateBlock} />
      </div>
    )}



      {/* --- BOTÓN GUARDAR --- */}
      <button
        onClick={saveDay}
        className="fixed bottom-6 right-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-xl"
      >
        Guardar
      </button>
    </div>
  );
}
