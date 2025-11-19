export type BlockType =
  | "title"
  | "text"
  | "image"
  | "shape"
  | "code"
  | "quote"
  | "separator"
    | "sticker";


export interface DayBlock {
  id: string;
  type: BlockType;

  // contenido genérico (texto, url imagen, código...)
  content: string;

  // posición y tamaño
  x: number;
  y: number;
  width?: number;
  height?: number;

  // estilos globales
  rotation?: number;
  opacity?: number;
  zIndex?: number;

  // estilos de texto
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textDecoration?: "none" | "underline" | "line-through";
  textAlign?: "left" | "center" | "right";
  color?: string;
  lineHeight?: number;
  padding?: number;

  // estilos de fondo
  backgroundColor?: string;
  backgroundGradient?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  boxShadow?: string; // shadow PRO
letterSpacing?: number;


  // para shapes
  shapeType?: "rectangle" | "circle" | "rounded" | "note";

  // para imágenes
  objectFit?: "cover" | "contain" | "fill";

  // para código
  language?: string;

  // para QuoteBlock
  borderLeft?: string;

  // para SeparatorBlock
  marginTop?: number;
  marginBottom?: number;
}
