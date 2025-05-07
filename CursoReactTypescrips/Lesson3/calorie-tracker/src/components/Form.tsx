import { useState } from "react";
import { categories } from "../data/categories";
import type { Category } from "../types";

interface Activity {
  category: number | null;
  name: string;
  calories: number;
}

export default function Form() {
  const [activity, setActivity] = useState<Activity>({
    category: null,
    name: "",
    calories: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivity({
      ...activity,
      category: parseInt(e.target.value),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setActivity({
      ...activity,
      [id]: id === "calories" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Actividad guardada:", activity);
    // Aquí podrías agregar validaciones o enviar a un context/global state
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      {/* Select de Categoría */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category ?? ""}
          onChange={handleChange}
        >
          <option value="" disabled>
            -- Selecciona una categoría --
          </option>
          {categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Input de nombre de la actividad */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, etc..."
          value={activity.name}
          onChange={handleInputChange}
        />
      </div>

      {/* Input de calorías */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. 200 o 400"
          value={activity.calories}
          onChange={handleInputChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
        value="Guardar Comida / Ejercicio"
      />
    </form>
  );
}
