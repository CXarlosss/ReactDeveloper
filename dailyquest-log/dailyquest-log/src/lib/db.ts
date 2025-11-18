import { Day } from "@/types/Day";

// Base de datos temporal
let days: Day[] = [
  {
    id: 1,
    date: "2025-01-01",
    blocks: [
      {
        id: "b1",
        type: "title",
        content: "Ejemplo de Día 1",
        x: 100,
        y: 100,
      },
      {
        id: "b2",
        type: "text",
        content: "Este es un bloque de texto editable.",
        x: 100,
        y: 200,
      }
    ]
  }
];

export function getAllDays(): Day[] {
  return days;
}

export function getDay(id: number): Day | undefined {
  return days.find((d) => d.id === id);
}

export function createDay(data: Omit<Day, "id">): Day {
  const newId = days.length ? days[days.length - 1].id + 1 : 1;
  const newDay: Day = {
    id: newId,
    date: data.date,
    blocks: data.blocks ?? []   // siempre array
  };
  days.push(newDay);
  return newDay;
}

export function updateDay(id: number, patch: Partial<Day>): Day | undefined {
  const index = days.findIndex((d) => d.id === id);
  if (index === -1) return undefined;

  const current = days[index];

  // 🚨 Aquí está la clave para evitar tu error
  let safeBlocks = current.blocks;

  if (patch.blocks) {
    safeBlocks = Array.isArray(patch.blocks)
      ? patch.blocks
      : [patch.blocks];  // si viene un solo objeto lo convierte en array
  }

  const updated: Day = {
    ...current,
    ...patch,
    blocks: safeBlocks,
  };

  days[index] = updated;
  return updated;
}

export function deleteDay(id: number): boolean {
  const prev = days.length;
  days = days.filter((d) => d.id !== id);
  return days.length < prev;
}
