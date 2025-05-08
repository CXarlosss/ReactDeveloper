import { useMemo, type Dispatch } from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { type ActivityActions } from "../reducers/activity-reducer";

// Props esperadas para este componente
type ActivityListProps = {
  activities: Activity[]; // Lista de actividades
  dispatch: Dispatch<ActivityActions>; // Función para enviar acciones al reducer
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  // Función para obtener el nombre de la categoría según su ID
  const categoryName = useMemo(
    () => (categoryId: number) => {
      const found = categories.find((cat) => cat.id === categoryId);
      return found ? found.name : "Sin categoría";
    },
    []
  );

  // Función para determinar el color de fondo según la categoría
  const categoryColor = (id: number): string => {
    switch (id) {
      case 1:
        return "bg-lime-500"; // Comida
      case 8:
        return "bg-blue-500"; // Ejercicio
      case 9:
        return "bg-pink-500"; // Pérdida de peso
      default:
        return "bg-orange-500"; // Otras categorías
    }
  };

  // Booleano que indica si no hay actividades
  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );

  return (
    <>
      {/* Título de la sección */}
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {/* Si no hay actividades, mostramos un mensaje */}
      {isEmptyActivities ? (
        <p className="text-center my-5">No hay actividades aún...</p>
      ) : (
        // Recorremos todas las actividades y las mostramos
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
          >
            {/* Información principal de la actividad */}
            <div className="space-y-2 relative">
              {/* Etiqueta de categoría */}
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${categoryColor(
                  activity.category
                )}`}
              >
                {categoryName(activity.category)}
              </p>

              {/* Nombre de la actividad */}
              <p className="text-2xl font-bold pt-5">{activity.name}</p>

              {/* Calorías mostradas */}
              <p className="font-black text-4xl text-lime-500">
                {activity.calories} <span>Calorías</span>
              </p>
            </div>

            {/* Botones de editar y eliminar */}
            <div className="flex gap-5 items-center">
              {/* Botón para editar */}
              <button
                aria-label="Editar actividad"
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
              </button>

              {/* Botón para eliminar */}
              <button
                aria-label="Eliminar actividad"
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  })
                }
              >
                <XCircleIcon className="h-8 w-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
