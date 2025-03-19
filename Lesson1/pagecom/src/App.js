/* eslint-disable no-undef */
// @ts-nocheck
import { useState, useEffect } from "react";
import "./App.css";
import {Header} from './components/Header';
import { TaskList } from "./components/TaskList";
function App() {
  const [count, setCount] = useState(0);
 
  // Manejo del estado del contador
  function handleAdd() {
    setCount(prev => prev + 3); // Incrementa directamente en 3
  }

  function handleSub() {
    setCount(prev => prev - 1);
  }

  function handleReset() {
    setCount(0);
  }

  // Efecto para ver los cambios de `count` en consola
  useEffect(() => {
    console.log("Count actualizado:", count);
  }, [count]);

  // Función para eliminar una tarea


  const username = "Carlos";

  return (
    <>
      <Header />
      <div>
        <h1 className="active">{username}</h1>
        <div className="box">
          <p>Count: {count}</p>
          <button onClick={handleSub} className="sub">SUB</button>
          <button onClick={handleAdd} className="add">ADD</button>
          <button onClick={handleReset} className="reset">RESET</button>
          <p>X * 2 = {count * 2}</p>
          <p>X * 3 = {count * 3}</p>
          <p>X * 10 = {count * 10}</p>
        </div>
        <div className="App">
          <TaskList />
        </div>

      </div>
    </>
  );
}

export default App;
