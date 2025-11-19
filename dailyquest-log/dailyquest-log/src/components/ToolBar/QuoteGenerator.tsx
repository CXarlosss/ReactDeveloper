"use client";

import { v4 as uuidv4 } from "uuid";

interface Props {
  onSelect: (block: {
    id: string;
    type: "quote";
    content: string;
    fontSize?: number;
    fontStyle?: string;
    color?: string;
    backgroundColor?: string;
    padding?: number;
    borderLeft?: string;
  }) => void;
}

const QUOTES = [
  "“La creatividad es inteligencia divirtiéndose.” — Albert Einstein",
  "“Haz lo que puedas, con lo que tienes, donde estés.” — Roosevelt",
  "“La disciplina es el puente entre metas y logros.”",
  "“Un día o día uno. Tú decides.”",
  "“El futuro depende de lo que hagas hoy.” — Gandhi",
];

export default function QuoteGenerator({ onSelect }: Props) {
  const generateQuote = () => {
    const pick = QUOTES[Math.floor(Math.random() * QUOTES.length)];

    onSelect({
      id: uuidv4(),
      type: "quote",
      content: pick,
      fontSize: 18,
      fontStyle: "italic",
      color: "#334155",
      backgroundColor: "#f8fafc",
      padding: 16,
      borderLeft: "4px solid #94a3b8",
    });
  };

  return (
    <button
      onClick={generateQuote}
      className="w-full px-3 py-2 text-sm bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg shadow transition"
    >
      ❝ Insertar cita ❞
    </button>
  );
}
