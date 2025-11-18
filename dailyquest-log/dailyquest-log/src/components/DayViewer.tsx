import Section from "./UI/Section";
import ImageGallery from "./ImageGallery";
import { Day } from "@/types/Day";

export default function DayViewer({ day }: { day: Day }) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{day.title}</h1>

        <a
          href={`/day/${day.id}/edit`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          Editar
        </a>
      </div>

      <Section title="Tema del día">{day.theme}</Section>
      <Section title="Reto de React">{day.reactChallenge}</Section>
      <Section title="Aprendizaje cultural">{day.culturalLesson}</Section>
      <Section title="Reto creativo">{day.creativeTask}</Section>
      <Section title="Reflexión personal">{day.reflection}</Section>

      <Section title="Imágenes">
        <ImageGallery images={day.images} />
      </Section>
    </div>
  );
}
