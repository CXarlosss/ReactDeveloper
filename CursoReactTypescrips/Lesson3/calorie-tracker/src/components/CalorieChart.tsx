// src/components/CalorieChart.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Activity } from "../types";

type CalorieChartProps = {
  activities: Activity[];
};

export default function CalorieChart({ activities }: CalorieChartProps) {
  // Agrupar datos por fecha
  const data = Object.values(
    activities.reduce((acc, act) => {
      if (!acc[act.date]) {
        acc[act.date] = { date: act.date, consumed: 0, burned: 0 };
      }
      if (act.category === 1) acc[act.date].consumed += act.calories;
      else if (act.category === 2) acc[act.date].burned += act.calories;
      return acc;
    }, {} as Record<string, { date: string; consumed: number; burned: number }>)
  ).map(d => ({
    ...d,
    net: d.consumed - d.burned,
  }));

  return (
    <div className="bg-white p-5 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center text-slate-700">Gráfico de Calorías por Fecha</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consumed" fill="#16a34a" name="Consumidas" />
          <Bar dataKey="burned" fill="#f97316" name="Quemadas" />
          <Bar dataKey="net" fill="#6366f1" name="Netas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
