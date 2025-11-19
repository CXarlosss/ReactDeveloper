import { DayBlock } from "@/types/DayBlock";

import TitleBlock from "./blocks/TitleBlock";
import TextBlock from "./blocks/TextBlock";
import ImageBlock from "./blocks/ImageBlock";
import QuoteBlock from "./blocks/QuoteBLock";
import SeparatorBlock from "./blocks/SeparatorBlock";

export default function BlockRenderer({ block }: { block: DayBlock }) {
  switch (block.type) {
    case "title":
      return <TitleBlock content={block.content} />;

    case "text":
      return <TextBlock content={block.content} />;

    case "image":
      return <ImageBlock content={block.content} />;

    case "quote":
  return (
    <div
      style={{
        fontSize: block.fontSize ?? 18,
        fontStyle: block.fontStyle ?? "italic",
        color: block.color ?? "#334155",
        background: block.backgroundColor ?? "#f8fafc",
        padding: block.padding ?? 16,
        borderLeft: block.borderLeft ?? "4px solid #94a3b8",
      }}
    >
      {block.content}
    </div>
  );

    case "separator":
      return <SeparatorBlock />;

    default:
      return null;
  }
}
