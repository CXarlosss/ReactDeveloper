"use client";

import { useState } from "react";
import { Day } from "@/types/Day";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Props {
  initial?: Partial<Day>;
  onSubmit: (data: Partial<Day>) => void;
}

export default function DayForm({ initial = {}, onSubmit }: Props) {
  const [form, setForm] = useState<Partial<Day>>(initial);

  const update = (key: keyof Day, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* ---- TITULO ---- */}
      <Card variant="soft">
        <Section
          title="Información del día"
          description="Introduce los campos generales que describen tu día."
        >
          <FormRow label="Título">
            <input
              className="w-full p-2 border rounded-lg bg-white"
              placeholder="¿Cómo resumirías este día?"
              value={form.title || ""}
              onChange={(e) => update("title", e.target.value)}
            />
          </FormRow>

          <FormRow label="Tema">
            <textarea
              className="w-full p-2 h-20 border rounded-lg bg-white"
              placeholder="¿Cuál fue el enfoque o el tema principal del día?"
              value={form.theme || ""}
              onChange={(e) => update("theme", e.target.value)}
            />
          </FormRow>
        </Section>
      </Card>

      {/* ---- SECCIONES DEL DÍA ---- */}
      <Card variant="soft">
        <Section
          title="Retos y Aprendizajes"
          description="Registra tu progreso para consolidar tu crecimiento."
        >
          <FormRow label="Reto de React">
            <textarea
              className="w-full p-2 h-24 border rounded-lg bg-white"
              placeholder="¿Qué reto técnico de React trabajaste hoy?"
              value={form.reactChallenge || ""}
              onChange={(e) => update("reactChallenge", e.target.value)}
            />
          </FormRow>

          <FormRow label="Aprendizaje cultural">
            <textarea
              className="w-full p-2 h-24 border rounded-lg bg-white"
              placeholder="Algo interesante que aprendiste del mundo…"
              value={form.culturalLesson || ""}
              onChange={(e) => update("culturalLesson", e.target.value)}
            />
          </FormRow>

          <FormRow label="Reto creativo">
            <textarea
              className="w-full p-2 h-24 border rounded-lg bg-white"
              placeholder="Ejercicio creativo que realizaste hoy…"
              value={form.creativeTask || ""}
              onChange={(e) => update("creativeTask", e.target.value)}
            />
          </FormRow>

          <FormRow label="Reflexión personal">
            <textarea
              className="w-full p-2 h-28 border rounded-lg bg-white"
              placeholder="¿Qué aprendiste de ti hoy?"
              value={form.reflection || ""}
              onChange={(e) => update("reflection", e.target.value)}
            />
          </FormRow>
        </Section>
      </Card>

      {/* ---- BOTÓN ---- */}
      <div className="flex justify-end">
        <Button size="lg" onClick={() => onSubmit(form)}>
          Guardar día
        </Button>
      </div>
    </div>
  );
}

/* ------------------ MINI COMPONENTE ------------------ */

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-neutral-700">{label}</p>
      {children}
    </div>
  );
}
