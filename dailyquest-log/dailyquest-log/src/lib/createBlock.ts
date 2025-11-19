// src/lib/createBlock.ts
import { DayBlock } from "@/types/DayBlock";
import { v4 as uuid } from "uuid";

export function createBlock(partial: Partial<DayBlock>): DayBlock {
  return {
    id: uuid(),
    type: partial.type || "text",
    content: partial.content ?? "",

    // posición inicial
    x: partial.x ?? 200,
    y: partial.y ?? 200,

    // tamaño base
    width: partial.width ?? 260,
    height: partial.height ?? 120,

    // estilos globales
    rotation: partial.rotation ?? 0,
    opacity: partial.opacity ?? 1,
    zIndex: partial.zIndex ?? 1,

    // texto
    fontSize: partial.fontSize ?? 18,
    fontFamily: partial.fontFamily ?? "Inter",
    fontWeight: partial.fontWeight ?? "normal",
    fontStyle: partial.fontStyle ?? "normal",
    textDecoration: partial.textDecoration ?? "none",
    textAlign: partial.textAlign ?? "left",
    color: partial.color ?? "#1f2937",
    lineHeight: partial.lineHeight ?? 1.4,
    padding: partial.padding ?? 8,
    letterSpacing: partial.letterSpacing ?? 0,

    // fondo
    backgroundColor: partial.backgroundColor ?? "transparent",
    backgroundGradient: partial.backgroundGradient,
    borderRadius: partial.borderRadius ?? 4,
    borderColor: partial.borderColor ?? "transparent",
    borderWidth: partial.borderWidth ?? 0,
    boxShadow: partial.boxShadow ?? "none",

    // shapes
    shapeType: partial.shapeType ?? "rectangle",

    // imágenes
    objectFit: partial.objectFit ?? "cover",

    // código
    language: partial.language ?? "text",

    // quote block
    borderLeft: partial.borderLeft,

    // separator
    marginTop: partial.marginTop ?? 10,
    marginBottom: partial.marginBottom ?? 10,

    ...partial,
  };
}
