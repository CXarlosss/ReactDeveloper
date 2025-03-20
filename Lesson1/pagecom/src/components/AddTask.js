import React, { useState } from "react";
import "./AddTask.css";

export const AddTask = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");
  const [progress, setProgress] = useState("false");

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask(newTask, progress);
    setNewTask("");
    setProgress("false");
  };

  const handleReset = () => {
    setNewTask("");
    setProgress("false");
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
        <select onChange={(event) => setProgress(event.target.value)} value={progress}>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
        <button type="button" onClick={handleReset} className="reset">Reset</button>
        <button type="submit">Add</button>
      </form>
    </section>
  );
};
