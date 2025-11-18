import DayCard from "@/components/DayCard";
import { Day } from "@/types/Day";

async function getDays(): Promise<Day[]> {
  const res = await fetch("http://localhost:3000/api/days", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const days = await getDays();

  return (
    <main className="p-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">DailyQuest Log</h1>

        <a
          href="/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Nuevo día
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day) => (
          <DayCard key={day.id} day={day} />
        ))}

        {days.length === 0 && (
          <p className="text-gray-400 text-center col-span-full">
            Aún no hay días creados. ¡Crea uno nuevo! 🌟
          </p>
        )}
      </div>
    </main>
  );
}
