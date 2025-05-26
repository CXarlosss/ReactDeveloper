import type { Request, Response, NextFunction } from 'express';
import Project, { IProject } from '../models/Project.js';
import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      project?: IProject;
    }
  }
}

// ✅ Middleware combinado que valida el ID y busca el proyecto, guardándolo en req.project
export async function projectExists(req: Request, res: Response, next: NextFunction) {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid project ID format" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error checking project" });
  }
}

// Middleware de validación del body del proyecto
export function validateProjectBody(req: Request, res: Response, next: NextFunction) {
  const { projectName, clientName, description } = req.body;

  if (!projectName || !clientName || !description) {
    return res.status(400).json({
      error: "projectName, clientName and description are required",
    });
  }

  next();
}
