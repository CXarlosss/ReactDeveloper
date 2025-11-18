"use client";

import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function MuralViewport({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isPanning, setIsPanning] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function startPan(e: React.MouseEvent) {
    // Sólo activar PAN si:
    // - Click derecho
    // - Shift + click izquierdo
    if (e.button === 2 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setLastPos({ x: e.clientX, y: e.clientY });
      document.body.style.cursor = "grabbing";
    }
  }

  function pan(e: React.MouseEvent) {
    if (!isPanning) return;

    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;

    setOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    setLastPos({ x: e.clientX, y: e.clientY });
  }

  function endPan() {
    setIsPanning(false);
    document.body.style.cursor = "default";
  }

  return (
    <div
      ref={ref}
      className="w-full h-full overflow-hidden relative bg-neutral-200"
      onMouseDown={startPan}
      onMouseMove={pan}
      onMouseUp={endPan}
      onMouseLeave={endPan}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: isPanning ? "none" : "transform 0.02s linear",
        }}
      >
        {children}
      </div>
    </div>
  );
}
