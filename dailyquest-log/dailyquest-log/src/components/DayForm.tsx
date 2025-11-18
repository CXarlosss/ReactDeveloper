"use client";

import { Day } from "@/types/Day";
import Button from "./UI/Button";
import { useState } from "react";

export default function DayForm({
  initial,
  onSubmit
}: {
  initial?: Partial<Day>;
  onSubmit: (data: Partial<Day>) => void;
}) {
  const [form, setForm] = useState<Partial<Day>>(initial || {});

  const update = (key: keyof Day, value: any) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        placeholder="Título"
        value={form.title || ""}
        onChange={(e) => update("title", e.target.value)}
      />

      <textarea
        className="w-full p-2 h-24 border rounded"
        placeholder="Tema"
        value={form.theme || ""}
        onChange={(e) => update("theme", e.target.value)}
      />

      <textarea
        className="w-full p-2 h-24 border rounded"
        placeholder="Reto de React"
        value={form.reactChallenge || ""}
        onChange={(e) => update("reactChallenge", e.target.value)}
      />

      <textarea
        className="w-full p-2 h-24 border rounded"
        placeholder="Aprendizaje cultural"
        value={form.culturalLesson || ""}
        onChange={(e) => update("culturalLesson", e.target.value)}
      />

      <textarea
        className="w-full p-2 h-24 border rounded"
        placeholder="Reto creativo"
        value={form.creativeTask || ""}
        onChange={(e) => update("creativeTask", e.target.value)}
      />

      <textarea
        className="w-full p-2 h-24 border rounded"
        placeholder="Reflexión personal"
        value={form.reflection || ""}
        onChange={(e) => update("reflection", e.target.value)}
      />

      <Button onClick={() => onSubmit(form)}>Guardar</Button>
    </div>
  );
}
