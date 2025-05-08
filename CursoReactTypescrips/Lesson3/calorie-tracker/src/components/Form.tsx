import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type Dispatch,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import CalorieChart from "./CalorieChart";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
  selectedDate: string;
};

// Crea una nueva actividad vacía
const createEmptyActivity = (date: string): Activity => ({
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
  date,
});

export default function Form({ dispatch, state, selectedDate }: FormProps) {
  const [activity, setActivity] = useState<Activity>(() => createEmptyActivity(selectedDate));

  // Actualiza el formulario si hay actividad seleccionada
  useEffect(() => {
    if (state.activeId) {
      const selected = state.activities.find((act) => act.id === state.activeId);
      if (selected) setActivity(selected);
    }
  }, [state.activeId, state.activities]);

  // Sincroniza fecha seleccionada cuando no está editando
  useEffect(() => {
    if (!state.activeId) {
      setActivity((prev) => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate, state.activeId]);

  // Maneja cambios en inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const parsedValue = ["category", "calories"].includes(id) ? Number(value) : value;
    setActivity((prev) => ({ ...prev, [id]: parsedValue }));
  };

  // Validación básica
  const isValid = activity.name.trim() !== "" && activity.calories > 0;

  // Maneja envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    // Solo reinicia si no está editando
    if (!state.activeId) {
      setActivity(createEmptyActivity(selectedDate));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow p-10 rounded-lg">
      {/* Categoría */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Nombre */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Desayuno, Pesas, Bicicleta..."
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      {/* Calorías */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorías:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. 250"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      {/* Fecha */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="date" className="font-bold">Fecha:</label>
        <input
          id="date"
          type="date"
          className="border border-slate-300 p-2 rounded-lg"
          value={activity.date}
          onChange={handleChange}
        />
      </div>

      {/* Gráfico de progreso */}
      <CalorieChart activities={state.activities} />

      {/* Botón */}
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
        value={
          state.activeId
            ? "Actualizar Actividad"
            : activity.category === 1
            ? "Guardar Comida"
            : "Guardar Ejercicio"
        }
        disabled={!isValid}
      />
    </form>
  );
}
