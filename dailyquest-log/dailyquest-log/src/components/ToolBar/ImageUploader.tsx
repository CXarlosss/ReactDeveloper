"use client";

import { useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSelect: (block: {
    id: string;
    type: "image";
    content: string;
    width: number;
    height: number;
    x: number;
    y: number;
    objectFit?: "cover" | "contain" | "fill";
    borderRadius?: number;
    boxShadow?: string;
  }) => void;
}

export default function ImageUploader({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // === LECTURA DEL ARCHIVO ===
  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onSelect({
          id: uuidv4(),
          type: "image",
          content: reader.result,
          width: 250,
          height: 200,
          x: 80,
          y: 80,
          objectFit: "cover",
          borderRadius: 8,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        });
      }
    };

    reader.readAsDataURL(file);
  }, [onSelect]);

  // === PEGAR DESDE PORTAPAPELES === 
  async function handlePaste(e: ClipboardEvent) {
    const item = Array.from(e.clipboardData?.items || []).find(
      (i) => i.type.startsWith("image/")
    );

    if (!item) return;

    const file = item.getAsFile();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onSelect({
          id: uuidv4(),
          type: "image",
          content: reader.result,
          width: 260,
          height: 200,
          x: 100,
          y: 100,
          objectFit: "cover",
        });
      }
    };
    reader.readAsDataURL(file);
  }

  // Activar listener global
  if (typeof window !== "undefined") {
    window.addEventListener("paste", handlePaste as any);
  }

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        className="
          w-full px-3 py-2
          bg-neutral-100 hover:bg-neutral-200
          rounded-lg text-sm font-medium
          shadow-sm hover:scale-[1.02] active:scale-[0.98]
          transition
        "
      >
        📸 Subir imagen
      </button>

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFile}
        accept="image/*"
      />
    </>
  );
}
