import { DayBlock } from "@/types/DayBlock";

interface Props {
  block: DayBlock;
}

export default function ImageBlock({ block }: Props) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: block.width ?? "auto",
        height: block.height ?? "auto",
        borderRadius: block.borderRadius ?? 8,
        borderWidth: block.borderWidth ?? 0,
        borderColor: block.borderColor ?? "transparent",
        borderStyle: "solid",
        opacity: block.opacity ?? 1,
        backgroundColor: block.backgroundColor ?? "transparent",
        boxShadow: block.boxShadow ?? "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={block.content}
        alt="Imagen"
        loading="lazy"
        draggable={false}
        className="w-full h-full"
        style={{
          objectFit: block.objectFit ?? "cover",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
