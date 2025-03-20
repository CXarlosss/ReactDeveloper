// @ts-nocheck
/* eslint-disable no-undef */
import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import { BoxCard } from "./BoxCard";
import { AddTask } from "./AddTask";
import "./TaskList.css";


export const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 5270, name: "Record React Lecturas", completed: true },
    { id: 3467, name: "Record React Lecturas", completed: true },
    { id: 7963, name: "Edit React Lecturas", completed: false },
    { id: 4727, name: "Record React Lecturas", completed: true },
    { id: 9765, name: "Watch React Lecturas", completed: false },
  ]);

  const [show, setShow] = useState(true);

  function handleDelete(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleAddTask(taskName, taskStatus) {
    if (!taskName.trim()) return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: taskStatus === "true",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log("Added Task:", newTask);
  }

  return (
    <>
      <h1>Task List</h1>
      
      {/* Aseguramos que solo haya un AddTask */}
      <AddTask onAddTask={handleAddTask} />
      
      <button className="trigger" onClick={() => setShow(!show)}>
        {show ? "Hide Tasks" : "Show Tasks"}
      </button>
      
      <ul>
        {show &&
          tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              handleDelete={handleDelete} 
            />
          ))}
      </ul>
      
      <BoxCard result="success" setShow={setShow} show={show}>
        <p className="title">Lorem ipsum dolor sit amet</p>
      
      </BoxCard>
      
      <BoxCard result="warning" setShow={setShow} show={show}>
        <p className="title">Lorem ipsum dolor sit amet</p>
       
      </BoxCard>
      
      <BoxCard result="alert" setShow={setShow} show={show}>
        <p className="title">Lorem ipsum dolor sit amet</p>
      
      </BoxCard>
    </>
  );
};