"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Viewport({ children }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPanning, setIsPanning] = useState(false);
  const [last, setLast] = useState({ x: 0, y: 0 });

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // --------------------------
  // PANNING
  // --------------------------
  function onPointerDown(e: React.PointerEvent) {
    // SHIFT + click OR right click
    if (e.button === 2 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setLast({ x: e.clientX, y: e.clientY });

      document.body.style.cursor = "grabbing";
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isPanning) return;

    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;

    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    setLast({ x: e.clientX, y: e.clientY });
  }

  function onPointerUp(e: React.PointerEvent) {
    setIsPanning(false);
    document.body.style.cursor = "default";
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  // --------------------------
  // ZOOM (Ctrl + Scroll)
  // --------------------------
  function onWheel(e: React.WheelEvent) {
    if (!e.ctrlKey) return; // only zoom with CTRL

    e.preventDefault();

    setZoom((z) => {
      let next = z - e.deltaY * 0.0015;
      next = Math.min(Math.max(next, 0.2), 4); // clamp zoom
      return next;
    });
  }

  // --------------------------
  // RENDER
  // --------------------------
  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden bg-neutral-200 relative"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onContextMenu={(e) => e.preventDefault()}
      onWheel={onWheel}
      style={{ touchAction: "none" }} // prevent interference
    >
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          willChange: "transform",
          transition: isPanning ? "none" : "transform 0.03s linear",
        }}
      >
        {children}
      </div>
    </div>
  );
}
