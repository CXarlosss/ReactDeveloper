"use client";

import { v4 as uuid } from "uuid";
import ToolbarButton from "./ToolbarButton";
import ToolbarSection from "./ToolbarSection";
import ImageUploader from "./ImageUploader";
import ColorPicker from "./ColorPicker";
import StickerPicker from "./StickerPicker";
import CodeSnippetPicker from "./CodeSnippetPicker";
import FactGenerator from "./FactGenerator";

interface Props {
  onAddBlock: (block: any) => void;
}

export default function Toolbar({ onAddBlock }: Props) {
  // Helper: crear bloque base
 const createBlock = (data: Partial<any>) => {
  return {
    id: uuid(),

    // Posición
    x: data.x ?? 200,
    y: data.y ?? 200,

    // Tamaño
    width: data.width ?? 220,
    height: data.height ?? 80,

    // Contenido
    content: data.content ?? "",
    type: data.type ?? "text",

    // Estilos
    color: data.color ?? "#000000",              // color de texto
    backgroundColor: data.backgroundColor ?? "", // fondo
    backgroundGradient: data.backgroundGradient ?? "",

    fontSize: data.fontSize ?? 18,
    fontFamily: data.fontFamily ?? "Inter",
    fontWeight: data.fontWeight ?? "normal",
    fontStyle: data.fontStyle ?? "normal",
    textAlign: data.textAlign ?? "left",

    // Extras
    zIndex: data.zIndex ?? 1,
    language: data.language ?? "txt",

    ...data,
  };
};


  return (
    <div
      className="
        fixed left-4 top-4 w-[260px]
        bg-white/80 backdrop-blur-xl
        border shadow-xl rounded-2xl
        p-4 space-y-6 z-50
      "
    >
      {/* ---------------------- TEXTO ---------------------- */}
      <ToolbarSection title="Texto">
        <ToolbarButton
          label="Título"
          icon={"🅣"}
          onClick={() =>
            onAddBlock(
              createBlock({
                type: "title",
                content: "Nuevo Título",
                fontSize: 32,
                bold: true,
                width: 300,
                height: 60,
              })
            )
          }
        />

        <ToolbarButton
          icon={"📝"}
          label="Texto"
          onClick={() =>
            onAddBlock(
              createBlock({
                type: "text",
                content: "Escribe aquí...",
                fontSize: 18,
              })
            )
          }
        />
      </ToolbarSection>

      {/* ---------------------- IMÁGENES ---------------------- */}
      <ToolbarSection title="Imágenes">
        <ImageUploader
          onSelect={(url) =>
            onAddBlock(
              createBlock({
                type: "image",
                content: url,
                width: 260,
                height: 200,
              })
            )
          }
        />
      </ToolbarSection>

      {/* ---------------------- FORMAS / COLORES ---------------------- */}
      <ToolbarSection title="Formas / Colores">
        <ColorPicker
          onSelect={(color) =>
            onAddBlock(
              createBlock({
                type: "shape",
                color,
                content: "",
                width: 200,
                height: 150,
              })
            )
          }
        />
      </ToolbarSection>

      {/* ---------------------- STICKERS ---------------------- */}
      <ToolbarSection title="Stickers">
        <StickerPicker
          onSelect={(emoji) =>
            onAddBlock(
              createBlock({
                type: "text",
                content: emoji,
                fontSize: 40,
                width: 80,
                height: 80,
              })
            )
          }
        />
      </ToolbarSection>

      {/* ---------------------- CÓDIGO ---------------------- */}
      <ToolbarSection title="Código">
        <CodeSnippetPicker
          onSelect={(code) =>
            onAddBlock(
              createBlock({
                type: "code",
                content: code,
                language: "tsx",
                width: 380,
                height: 140,
                fontFamily: "monospace",
                fontSize: 14,
                color: "#111827",
              })
            )
          }
        />
      </ToolbarSection>

      {/* ---------------------- CULTURA + APRENDIZAJE ---------------------- */}
      <ToolbarSection title="Aprende algo nuevo">
        <FactGenerator
          onSelect={(fact) =>
            onAddBlock(
              createBlock({
                type: "text",
                content: fact,
                fontSize: 18,
                italic: true,
                width: 280,
                height: 100,
              })
            )
          }
        />
      </ToolbarSection>
    </div>
  );
}
