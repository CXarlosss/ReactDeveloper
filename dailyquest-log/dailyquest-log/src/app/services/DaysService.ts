import { Day } from "@/types/Day";

export const DaysService = {
  async getAll(): Promise<Day[]> {
    const res = await fetch("/api/days");
    return res.json();
  },

  async get(id: number): Promise<Day> {
    const res = await fetch(`/api/days/${id}`);
    return res.json();
  },

  async create(body: Partial<Day>) {
    const res = await fetch("/api/days", {
      method: "POST",
      body: JSON.stringify(body)
    });
    return res.json();
  },

  async update(id: number, body: Partial<Day>) {
    await fetch(`/api/days/${id}`, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  },

  async remove(id: number) {
    await fetch(`/api/days/${id}`, {
      method: "DELETE"
    });
  }
};
