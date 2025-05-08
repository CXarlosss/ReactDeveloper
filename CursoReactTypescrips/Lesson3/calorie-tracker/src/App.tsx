import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import DateSelector from "./components/DateSelector";
import { useState } from "react";
import HistoryByDate from "./components/HistoryByDateProps"; // 👈 Asegúrate de importar

export default function App() {
  // Estado global con useReducer
  const [state, dispatch] = useReducer(activityReducer, initialState);
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0]; // fecha actual por defecto
  });
  const [showHistory, setShowHistory] = useState(false);

  // Guardar actividades en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  // Determina si hay actividades para habilitar el botón de reinicio
  const canRestartApp = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );

  return (
    <>
      {/* Header */}
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorías
          </h1>

          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      {/* Formulario */}
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
        <Form dispatch={dispatch} state={state} selectedDate={selectedDate} />

        </div>
      </section>

      {/* Resumen de calorías */}
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      {/* Lista de actividades */}
      <section className="p-10 mx-auto max-w-4xl space-y-5">
  <div className="flex justify-between items-center">
    <DateSelector
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
    <button
      className="text-sm underline text-lime-700 font-bold"
      onClick={() => setShowHistory(!showHistory)}
    >
      {showHistory ? "Ocultar historial" : "Ver historial completo"}
    </button>
  </div>

  {showHistory ? (
    <HistoryByDate activities={state.activities} />
  ) : (
    <ActivityList
      activities={state.activities.filter((a) => a.date === selectedDate)}
      dispatch={dispatch}
    />
  )}
</section>
    </>
  );
}
