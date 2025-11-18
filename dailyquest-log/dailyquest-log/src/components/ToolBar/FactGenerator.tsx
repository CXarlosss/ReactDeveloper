"use client";

import { v4 as uuidv4 } from "uuid";

interface Props {
  onSelect: (block: {
    id: string;
    type: "text";
    content: string;
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
  }) => void;
}

export default function FactGenerator({ onSelect }: Props) {
  async function generateFact() {
    // FUTURO: Aquí conectaremos OpenAI para generar datos reales
    const facts = [
      "Sabías que el ADN humano comparte un 60% con el de un plátano 🍌",
      "Un pulpo tiene tres corazones ❤️❤️❤️",
      "Los programadores usan 'foo' y 'bar' desde la jerga militar de los 60.",
      "Los koalas duermen hasta 20 horas al día 🐨",
      "React se lanzó en 2013 por ingenieros de Facebook.",
      "El Monte Everest crece 4 mm cada año.",
      "Los gatos no pueden saborear lo dulce 😺",
    ];

    const pick = facts[Math.floor(Math.random() * facts.length)];

    onSelect({
      id: uuidv4(),
      type: "text",
      content: pick,
      fontSize: 20,
      color: "#1e293b",
      backgroundColor: "#f1f5f9",
    });
  }

  return (
    <button
      onClick={generateFact}
      className="
        w-full px-4 py-2
        bg-indigo-600 hover:bg-indigo-700
        text-white font-semibold
        rounded-lg shadow
        transition
      "
    >
      🤓 Apréndeme algo hoy
    </button>
  );
}
