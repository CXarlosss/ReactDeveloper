"use client";

import { v4 as uuidv4 } from "uuid";

const STICKERS = [
  { id: "st1", symbol: "🔥" },
  { id: "st2", symbol: "⭐" },
  { id: "st3", symbol: "🌱" },
  { id: "st4", symbol: "🧠" },
  { id: "st5", symbol: "🐺" },
  { id: "st6", symbol: "🌙" },
  { id: "st7", symbol: "⚡" },
  { id: "st8", symbol: "🍄" },
];

interface Props {
  onSelect: (block: {
    id: string;
    type: "text";
    content: string;
    fontSize: number;
    x: number;
    y: number;
    rotation?: number;
  }) => void;
}

export default function StickerPicker({ onSelect }: Props) {
  function addSticker(emoji: string) {
    onSelect({
      id: uuidv4(),
      type: "text",
      content: emoji,
      fontSize: 48, // tamaño por defecto
      x: 120,
      y: 120,
      rotation: Math.random() * 15 - 7, // inclinación random aesthetic
    });
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {STICKERS.map((s) => (
        <button
          key={s.id}
          onClick={() => addSticker(s.symbol)}
          className="
            text-2xl 
            p-2 
            bg-white 
            hover:bg-neutral-100
            rounded-xl 
            shadow-sm 
            hover:scale-110 
            transition
          "
        >
          {s.symbol}
        </button>
      ))}
    </div>
  );
}
