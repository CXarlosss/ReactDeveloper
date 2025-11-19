"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { Day } from "@/types/Day";

interface Props {
  day: Day;
}

export default function DayCard({ day }: Props) {
  return (
    <Card
      as="article"
      variant="soft"
      padding="md"
      hover
      className="
        transition cursor-pointer 
        hover:bg-neutral-50 
        active:scale-[0.99]
        focus-within:ring-2 
        focus-within:ring-blue-500
      "
    >
      <Link
        href={`/day/${day.id}`}
        className="block w-full h-full focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-neutral-900">
          {day.title || "Día sin título"}
        </h3>

        {day.theme && (
          <p className="text-sm text-neutral-600 mt-1">
            {day.theme}
          </p>
        )}

        <p className="text-xs text-neutral-400 mt-3">
          {day.date}
        </p>
      </Link>
    </Card>
  );
}
