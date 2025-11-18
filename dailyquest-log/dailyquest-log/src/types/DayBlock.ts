export interface DayBlock {
  id: string;

  type: "title" | "text" | "image" | "shape" | "code";

  content: string; // texto o URL imagen

  // Posición y tamaño
  x: number;
  y: number;
  width?: number;
  height?: number;

  // Estilos generales
  rotation?: number;
  opacity?: number;
  zIndex?: number;

  // Estilos de texto
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textDecoration?: "none" | "underline" | "line-through";
  textAlign?: "left" | "center" | "right";
  color?: string;

  // Estilos de fondo
  backgroundColor?: string;
  backgroundGradient?: string; // linear-gradient(...)
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  boxShadow?: string;

  // Para shapes
  shapeType?: "rectangle" | "circle" | "rounded" | "note";

  // Para imágenes
  objectFit?: "cover" | "contain" | "fill";

  // Para código
  language?: string;
}
