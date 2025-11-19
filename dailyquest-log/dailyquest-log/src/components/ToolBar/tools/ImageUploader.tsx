"use client";

import { useRef, useCallback, useEffect } from "react";
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

  const createImageBlock = useCallback(
    (dataUrl: string) =>
      onSelect({
        id: uuidv4(),
        type: "image",
        content: dataUrl,
        width: 260,
        height: 200,
        x: 100,
        y: 100,
        objectFit: "cover",
        borderRadius: 8,
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }),
    [onSelect]
  );

  // === FILE UPLOAD ===
  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          createImageBlock(reader.result);
        }
      };

      reader.readAsDataURL(file);
    },
    [createImageBlock]
  );

  // === PASTE SUPPORT ===
  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const item = [...(e.clipboardData?.items ?? [])].find((i) =>
        i.type.startsWith("image/")
      );
      if (!item) return;

      const file = item.getAsFile();
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          createImageBlock(reader.result);
        }
      };

      reader.readAsDataURL(file);
    },
    [createImageBlock]
  );

  // === ATTACH/REMOVE LISTENER SAFE ===
  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        className="
          w-full px-3 py-2 bg-neutral-100 
          hover:bg-neutral-200 
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
        onChange={handleFile}
        accept="image/*"
        className="hidden"
      />
    </>
  );
}
