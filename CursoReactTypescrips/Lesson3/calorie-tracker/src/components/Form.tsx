import { useState, type ChangeEvent, type FormEvent, type Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const createInitialActivity = (): Activity => ({
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
});

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(createInitialActivity);

  useEffect(() => {
    if (state.activeId) {
      const selected = state.activities.find((act) => act.id === state.activeId);
      if (selected) setActivity(selected);
    }
  }, [state.activeId, state.activities]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    const isNumber = id === "category" || id === "calories";
    setActivity({
      ...activity,
      [id]: isNumber ? +value : value,
    });
  };

  const isValid = () => activity.name.trim() !== "" && activity.calories > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    if (!state.activeId) {
      setActivity(createInitialActivity());
    }
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* Categoría */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Actividad */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Pesas, Bicicleta..."
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      {/* Calorías */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. 200"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      {/* Botón */}
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
        value={
          state.activeId
            ? "Actualizar actividad"
            : activity.category === 1
            ? "Guardar Comida"
            : "Guardar Ejercicio"
        }
        disabled={!isValid()}
      />
    </form>
  );
}
