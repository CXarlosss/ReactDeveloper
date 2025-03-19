import React, { useState } from "react";
import "./AddTask.css";

export const AddTask = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask(newTask); // Llama a la función para agregar la tarea
    setNewTask(""); // Limpia el input
  };

  return (
    <section className="addtask">
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Task name: </label>
        <input
          onChange={handleChange}
          type="text"
          id="task"
          name="task"
          placeholder="Add a task"
          autoComplete="off"
          value={newTask}
        />
        <button type="submit">Add</button>
      </form>
    </section>
  );
};
