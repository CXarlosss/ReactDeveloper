"use client";

import { v4 as uuidv4 } from "uuid";
import { memo } from "react";

interface Props {
  onSelect: (block: {
    id: string;
    type: "quote";
    content: string;
  }) => void;
}

const QUOTES = [
  "“La creatividad es inteligencia divirtiéndose.” — Albert Einstein",
  "“Haz lo que puedas, con lo que tienes, donde estés.” — Roosevelt",
  "“La disciplina es el puente entre metas y logros.”",
  "“Un día o día uno. Tú decides.”",
  "“El futuro depende de lo que hagas hoy.” — Gandhi",
];

function QuoteGenerator({ onSelect }: Props) {
  const generateQuote = () => {
    const pick = QUOTES[Math.floor(Math.random() * QUOTES.length)];

    onSelect({
      id: uuidv4(),
      type: "quote",
      content: pick,
    });
  };

  return (
    <button
      onClick={generateQuote}
      className="
        w-full px-3 py-2 text-sm
        bg-neutral-800 hover:bg-neutral-700 
        text-white rounded-lg shadow
        transition
      "
    >
      ❝ Insertar cita ❞
    </button>
  );
}

export default memo(QuoteGenerator);
