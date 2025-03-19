// @ts-nocheck
/* eslint-disable no-undef */
import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import { BoxCard } from "./BoxCard";
import { AddTask } from "./AddTask";

export const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 5270, name: "Record React Lecturas", completed: true },
    { id: 3467, name: "Record React Lecturas", completed: true },
    { id: 7963, name: "Edit React Lecturas", completed: true },
    { id: 4727, name: "Record React Lecturas", completed: true },
    { id: 9765, name: "Watch React Lecturas", completed: true },
  ]);

  const [show, setShow] = useState(true);

  function handleDelete(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleAddTask(taskName) {
    if (taskName.trim() === "") return;

    const newTask = {
      id: Date.now(), // Genera un id único basado en el tiempo
      name: taskName,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  return (
    <>
      <h1>Task list</h1>

      <AddTask onAddTask={handleAddTask} />

      <button className="trigger" onClick={() => setShow(!show)}>
        Toggle
      </button>

      <ul>
        {show &&
          tasks.map((task) => (
            <TaskCard task={task} key={task.id} handleDelete={handleDelete} />
          ))}
      </ul>

      <BoxCard result="success" setShow={setShow} show={show}>
        <p className="title">Lorem ipsum dolor sit amet</p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </BoxCard>

      <BoxCard result="warning" setShow={setShow} show={show}>
        <p className="title">Lorem ipsum dolor sit amet</p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </BoxCard>

      <BoxCard result="alert" setShow={setShow} show={show}>
        <p className="title">Lorem ipsum dolor sit amet</p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </BoxCard>
    </>
  );
};
