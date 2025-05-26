import type { Request, Response } from 'express';
import mongoose from "mongoose";
import Project from '../models/Project.js';
import Task from '../models/Task.js';

export class TaskController {
  // Crear una tarea en un proyecto
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { name, description, dueDate } = req.body;

    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const task = await Task.create({
        name,
        description,
        dueDate,
        project: project._id,
      });

      project.tasks.push(task._id as mongoose.Types.ObjectId);
      await project.save();

      res.status(201).json(task);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Error creating task" });
    }
  };

  // Obtener todas las tareas de un proyecto
  static getTasks = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      const project = await Project.findById(projectId).populate('tasks');
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.status(200).json(project.tasks);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Error fetching tasks" });
    }
  };

  // Actualizar una tarea específica
  static updateTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const { name, description, dueDate, status } = req.body;

    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { name, description, dueDate, status },
        { new: true, runValidators: true }
      );

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json(task);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Error updating task" });
    }
  };

  // Eliminar una tarea específica
  static deleteTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;

    try {
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Opcional: eliminar la tarea del array tasks en el proyecto
      await Project.findByIdAndUpdate(task.project, {
        $pull: { tasks: task._id },
      });

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Error deleting task" });
    }
  };
}

export default TaskController;