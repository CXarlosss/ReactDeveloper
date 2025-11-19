import { Day } from "@/types/Day";

export const DaysService = {
  async getAll(): Promise<Day[]> {
    const res = await fetch("/api/days", { cache: "no-store" });
    return res.json();
  },

  async get(id: number): Promise<Day> {
    const res = await fetch(`/api/days/${id}`, { cache: "no-store" });
    return res.json();
  },

  async create(body: Partial<Day>) {
    const res = await fetch("/api/days", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return res.json();
  },

  async update(id: number, body: Partial<Day>) {
    const res = await fetch(`/api/days/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    return res.json().catch(() => null); // evitar crash si no hay body
  },

  async remove(id: number) {
    await fetch(`/api/days/${id}`, { method: "DELETE" });
  }
};
