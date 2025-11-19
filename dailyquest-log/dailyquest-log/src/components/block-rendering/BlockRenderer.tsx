import { DayBlock } from "@/types/DayBlock";

import TitleBlock from "@/components/blocks/TitleBlock";
import TextBlock from "@/components/blocks/TextBlock";
import ImageBlock from "@/components/blocks/ImageBlock";
import QuoteBlock from "@/components/blocks/QuoteBlock";
import SeparatorBlock from "@/components/blocks/SeparatorBlock";

export default function BlockRenderer({ block }: { block: DayBlock }) {
  console.log("🧱 Renderizando block:", block);

  switch (block.type) {

    case "title":
      return <TitleBlock block={block} />;

    case "text":
      return <TextBlock block={block} />;

    case "image":
      return <ImageBlock block={block} />;

    case "quote":
      return <QuoteBlock block={block} />;

    case "separator":
      return <SeparatorBlock block={block} />;

    // ⭐⭐⭐ AÑADIDO — EL QUE FALTABA ⭐⭐⭐
    case "sticker":
      return (
        <div
          style={{
            fontSize: block.fontSize ?? 48,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {block.content}
        </div>
      );

    case "shape":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              block.backgroundGradient ??
              block.backgroundColor ??
              block.color ??
              "#ccc",
            borderRadius:
              block.shapeType === "circle"
                ? "50%"
                : block.borderRadius ?? 8,
          }}
        ></div>
      );

    case "code":
      return (
        <pre
          style={{
            fontFamily: block.fontFamily ?? "monospace",
            fontSize: block.fontSize ?? 14,
            color: block.color ?? "#111",
            padding: block.padding ?? 8,
            background: block.backgroundColor ?? "#0f172a",
            overflow: "auto",
          }}
        >
          {block.content}
        </pre>
      );

    default:
      return null;
  }
}
