import type { Request, Response } from 'express';
import mongoose from "mongoose";
import Project from '../models/Project.js';
import Task from '../models/Task.js';

export class TaskController {
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

      // 👇 Solución al error
      project.tasks.push(task._id as mongoose.Types.ObjectId);
      await project.save();

      res.status(201).json(task);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Error creating task" });
    }
  };
}
