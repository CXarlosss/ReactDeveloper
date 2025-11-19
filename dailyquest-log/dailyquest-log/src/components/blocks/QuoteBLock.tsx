import { DayBlock } from "@/types/DayBlock";

interface Props {
  block: DayBlock;
}

export default function QuoteBlock({ block }: Props) {
  const {
    content,
    fontSize,
    fontStyle,
    color,
    backgroundColor,
    padding,
    borderLeft,
    width,
    height,
    opacity,
    borderRadius,
    boxShadow,
  } = block;

  return (
    <blockquote
      className="whitespace-pre-wrap leading-relaxed"
      style={{
        width: width ?? "auto",
        height: height ?? "auto",
        fontSize: fontSize ?? 18,
        fontStyle: fontStyle ?? "italic",
        color: color ?? "#334155",

        background: backgroundColor ?? "#f8fafc",
        borderLeft: borderLeft ?? "4px solid #94a3b8",
        padding: padding ?? 16,

        borderRadius: borderRadius ?? 8,
        opacity: opacity ?? 1,
        boxShadow: boxShadow ?? "0 2px 6px rgba(0,0,0,0.06)",
      }}
    >
      {content}
    </blockquote>
  );
}
