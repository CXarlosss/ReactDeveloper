import { DayBlock } from "@/types/DayBlock";

interface Props {
  block: DayBlock;
}

export default function SeparatorBlock({ block }: Props) {
  return (
    <div
      className="w-full"
      style={{
        width: block.width ?? "100%",
        height: block.height ?? 1,
        backgroundColor: block.color ?? "#d1d5db",
        opacity: block.opacity ?? 1,
        marginTop: block.marginTop ?? 16,
        marginBottom: block.marginBottom ?? 16,
        borderRadius: block.borderRadius ?? 2,
      }}
    />
  );
}
