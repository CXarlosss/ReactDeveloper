import { DayBlock } from "@/types/DayBlock";

interface Props {
  block: DayBlock;
}

export default function TextBlock({ block }: Props) {
  const {
    content,
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    color,
    backgroundColor,
    padding,
    textAlign,
    lineHeight,
    width,
    height,
    borderRadius,
    opacity,
    boxShadow,
  } = block;

  return (
    <div
      className="whitespace-pre-wrap"
      style={{
        width: width ?? "auto",
        height: height ?? "auto",

        fontSize: fontSize ?? 18,
        fontFamily: fontFamily ?? "Inter",
        fontWeight: fontWeight ?? "normal",
        fontStyle: fontStyle ?? "normal",
        color: color ?? "#1e293b",

        background: backgroundColor ?? "transparent",
        padding: padding ?? 4,
        textAlign: textAlign ?? "left",
        lineHeight: lineHeight ?? 1.45,

        borderRadius: borderRadius ?? 4,
        opacity: opacity ?? 1,
        boxShadow: boxShadow ?? "none",
      }}
    >
      {content}
    </div>
  );
}
