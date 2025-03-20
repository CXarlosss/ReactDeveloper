/* eslint-disable no-undef */
// @ts-nocheck
import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { TaskList } from "./components/TaskList";


function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 5270, name: "Record React Lecturas", completed: true },
    { id: 3467, name: "Record React Lecturas", completed: true },
    { id: 7963, name: "Edit React Lecturas", completed: true },
    { id: 4727, name: "Record React Lecturas", completed: true },
    { id: 9765, name: "Watch React Lecturas", completed: true },
  ]);

  // Función para agregar una tarea


  // Función para eliminar una tarea
  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  // Contador
  function handleAdd() {
    setCount((prev) => prev + 3);
  }

  function handleSub() {
    setCount((prev) => prev - 1);
  }

  function handleReset() {
    setCount(0);
  }

  const username = "Carlos";

  return (
    <>
      <Header />
      <div>
        <h1 className="active">{username}</h1>
        <div className="box">
          <p>Count: {count}</p>
          <button onClick={handleSub} className="sub">
            SUB
          </button>
          <button onClick={handleAdd} className="add">
            ADD
          </button>
          <button onClick={handleReset} className="reset">
            RESET
          </button>
          <p>X * 2 = {count * 2}</p>
          <p>X * 3 = {count * 3}</p>
          <p>X * 10 = {count * 10}</p>
        </div>

        <div className="App">
         
          <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
        </div>
      </div>
    </>
  );
}

export default App;
