"use client";

import Link from "next/link";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ImageGallery from "@/components/ImageGallery";
import { Day } from "@/types/Day";

interface Props {
  day: Day;
}

export default function DayViewer({ day }: Props) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-neutral-900">
            {day.title || "Día sin título"}
          </h1>

          <p className="text-neutral-400 text-sm">{day.date}</p>
        </div>

        <Link href={`/day/${day.id}/edit`} className="shrink-0">
          <Button variant="secondary" size="md">
            ✏️ Editar
          </Button>
        </Link>
      </div>

      {/* SECCIONES */}
      <Card variant="soft">
        <Section title="Tema del día">
          <p className="whitespace-pre-wrap leading-relaxed text-neutral-700">
            {day.theme || "—"}
          </p>
        </Section>
      </Card>

      <Card variant="soft">
        <Section
          title="Reto de React"
          description="¿Qué desafío técnico resolviste hoy?"
        >
          <p className="whitespace-pre-wrap leading-relaxed text-neutral-700">
            {day.reactChallenge || "—"}
          </p>
        </Section>
      </Card>

      <Card variant="soft">
        <Section
          title="Aprendizaje cultural"
          description="Algo interesante que aprendiste del mundo hoy."
        >
          <p className="whitespace-pre-wrap leading-relaxed text-neutral-700">
            {day.culturalLesson || "—"}
          </p>
        </Section>
      </Card>

      <Card variant="soft">
        <Section
          title="Reto creativo"
          description="Ejercicio o expresión creativa que realizaste hoy."
        >
          <p className="whitespace-pre-wrap leading-relaxed text-neutral-700">
            {day.creativeTask || "—"}
          </p>
        </Section>
      </Card>

      <Card variant="soft">
        <Section
          title="Reflexión personal"
          description="¿Qué aprendiste de ti durante este día?"
        >
          <p className="whitespace-pre-wrap leading-relaxed text-neutral-700">
            {day.reflection || "—"}
          </p>
        </Section>
      </Card>

      {/* GALERÍA */}
      {day.images && day.images.length > 0 && (
        <Card variant="soft">
          <Section title="Imágenes del día" description="Recuerdos visuales.">
            <ImageGallery images={day.images} />
          </Section>
        </Card>
      )}
    </div>
  );
}
