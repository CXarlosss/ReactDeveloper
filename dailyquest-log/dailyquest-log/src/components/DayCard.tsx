import Link from "next/link";
import Card from "./UI/Card";
import { Day } from "@/types/Day";

export default function DayCard({ day }: { day: Day }) {
  return (
    <Link href={`/day/${day.id}`}>
      <Card>
        <h3 className="text-lg font-bold">{day.title}</h3>
        <p className="text-sm text-gray-500">{day.theme}</p>
        <p className="text-xs text-gray-400 mt-2">{day.date}</p>
      </Card>
    </Link>
  );
}
