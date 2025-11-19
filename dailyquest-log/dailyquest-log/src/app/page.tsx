"use client";

import { useEffect, useState } from "react";
import DayCard from "@/components/DayCard";
import { Day } from "@/types/Day";

export default function Home() {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    fetch("/api/days")
      .then(res => res.json())
      .then(data => setDays(data))
      .catch(err => console.error("❌ Error cargando días:", err));
  }, []);

  return (
    <main className="p-10 space-y-10">
      <h1 className="text-4xl font-bold">DailyQuest Log</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map(day => (
          <DayCard key={day.id} day={day} />
        ))}
      </div>
    </main>
  );
}
