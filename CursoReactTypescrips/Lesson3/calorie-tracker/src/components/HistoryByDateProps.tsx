// components/HistoryByDate.tsx
import type { Activity } from "../types";

type HistoryByDateProps = {
  activities: Activity[];
};

export default function HistoryByDate({ activities }: HistoryByDateProps) {
  const groupedByDate = activities.reduce((acc, activity) => {
    if (!acc[activity.date]) acc[activity.date] = [];
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  const getSummary = (list: Activity[]) => {
    const consumed = list
      .filter((a) => a.category === 1)
      .reduce((sum, a) => sum + a.calories, 0);
    const burned = list
      .filter((a) => a.category === 2)
      .reduce((sum, a) => sum + a.calories, 0);
    return { consumed, burned, net: consumed - burned };
  };

  return (
    <div className="space-y-10">
      {Object.entries(groupedByDate).map(([date, list]) => {
        const { consumed, burned, net } = getSummary(list);
        return (
          <div key={date} className="bg-white p-5 rounded shadow space-y-3">
            <h3 className="font-bold text-xl">{date}</h3>
            <p>🍽️ Consumidas: <strong>{consumed}</strong></p>
            <p>🏃‍♂️ Quemadas: <strong>{burned}</strong></p>
            <p>⚖️ Netas: <strong>{net}</strong></p>
            <ul className="list-disc list-inside mt-3">
              {list.map((act) => (
                <li key={act.id}>{act.name} - {act.calories} cal</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
