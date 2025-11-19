"use client";

import { memo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { STICKERS } from "@/data/stickers";

interface Props {
  onSelect: (block: {
    id: string;
    type: "sticker";
    content: string;
    fontSize: number;
    x: number;
    y: number;
    rotation?: number;
  }) => void;
}

function StickerPicker({ onSelect }: Props) {
  const handleAddSticker = useCallback(
    (emoji: string) => {
      onSelect({
        id: uuidv4(),
        type: "sticker",
        content: emoji,
        fontSize: 48,
        x: 200 + Math.random() * 60 - 30,
        y: 200 + Math.random() * 60 - 30,
        rotation: Math.random() * 24 - 12,
      });
    },
    [onSelect]
  );

  return (
    <div className="grid grid-cols-4 gap-2">
      {STICKERS.map((s) => (
        <button
          key={s.id}
          onClick={() => handleAddSticker(s.symbol)}
          aria-label={`Insertar sticker ${s.symbol}`}
          className="
            text-3xl
            p-2
            bg-white
            border
            border-neutral-200
            rounded-xl
            shadow-sm
            hover:bg-neutral-100
            hover:scale-110
            active:scale-95
            transition
          "
        >
          {s.symbol}
        </button>
      ))}
    </div>
  );
}

export default memo(StickerPicker);
