import { Day } from "@/types/Day";

let days: Day[] = [];

/* ============================================================
   GET ALL
============================================================ */
export function getAllDays(): Day[] {
  return days;
}

/* ============================================================
   GET ONE
============================================================ */
export function getDay(id: string): Day | undefined {
  return days.find((d) => d.id === id);
}

/* ============================================================
   CREATE
============================================================ */
export function createDay(data: Omit<Day, "id">): Day {
  const newDay: Day = {
    id: crypto.randomUUID(),
    ...data,
  };

  days.push(newDay);
  return newDay;
}

/* ============================================================
   UPDATE
============================================================ */
export function updateDay(id: string, patch: Partial<Day>): Day | undefined {
  const index = days.findIndex((d) => d.id === id);
  if (index === -1) return undefined;

  days[index] = {
    ...days[index],
    ...patch,
    blocks: Array.isArray(patch.blocks)
      ? patch.blocks
      : days[index].blocks,
  };

  return days[index];
}

/* ============================================================
   DELETE
============================================================ */
export function deleteDay(id: string): boolean {
  const before = days.length;
  days = days.filter((d) => d.id !== id);
  return before !== days.length;
}
