// @ts-nocheck
/* eslint-disable no-undef */
import React from 'react'

export const TaskCard = ({task, handleDelete}) => {
    
  return (
    <>
    <li key={task.id} className={task.completed ? "completed" : "incompleted"}>
    {task.id} - {task.name}
    <button onClick={() => handleDelete(task.id)} className='delete'>Delete</button>
  </li>
  </>
  )
}

