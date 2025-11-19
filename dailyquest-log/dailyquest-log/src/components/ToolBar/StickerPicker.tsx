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
        x: 150 + Math.random() * 80 - 40,
        y: 150 + Math.random() * 80 - 40,
        rotation: Math.random() * 20 - 10,
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
          className="
            text-3xl 
            p-2 
            bg-white 
            hover:bg-neutral-100
            rounded-xl 
            shadow-sm 
            hover:scale-110 
            active:scale-95
            transition
          "
          aria-label={`Insertar sticker ${s.symbol}`}
        >
          {s.symbol}
        </button>
      ))}
    </div>
  );
}

export default memo(StickerPicker);
