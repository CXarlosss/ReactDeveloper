import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  // Calorías consumidas (categoría 1)
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  // Calorías quemadas (categoría 2)
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  // Diferencia entre calorías consumidas y quemadas
  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorías
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        {/* Componente para mostrar calorías consumidas */}
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />

        {/* Calorías quemadas */}
        <CalorieDisplay calories={caloriesBurned} text="Ejercicio" />

        {/* Diferencia total */}
        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  );
}
