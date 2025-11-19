import { DayBlock } from "@/types/DayBlock";

interface Props {
  block: DayBlock;
}

export default function TitleBlock({ block }: Props) {
  const {
    content,
    width,
    height,
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    color,
    textAlign,
    lineHeight,
    backgroundColor,
    padding,
    borderRadius,
    boxShadow,
    opacity,
  } = block;

  return (
    <h2
      className="whitespace-pre-wrap"
      style={{
        width: width ?? "auto",
        height: height ?? "auto",

        fontSize: fontSize ?? 32,
        fontFamily: fontFamily ?? "Inter",
        fontWeight: fontWeight ?? "700",
        fontStyle: fontStyle ?? "normal",
        color: color ?? "#111827",
        textAlign: textAlign ?? "left",
        lineHeight: lineHeight ?? 1.2,

        background: backgroundColor ?? "transparent",
        padding: padding ?? 4,

        borderRadius: borderRadius ?? 4,
        opacity: opacity ?? 1,
        boxShadow: boxShadow ?? "none",
      }}
    >
      {content}
    </h2>
  );
}
