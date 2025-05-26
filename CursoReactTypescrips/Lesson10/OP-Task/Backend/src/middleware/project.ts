import type { Request, Response, NextFunction } from 'express';
import Project from '../models/Project.js';
import mongoose from 'mongoose';
export async function validateProjectExist(req: Request, res: Response, next: NextFunction) {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    next();
  } catch (error) {
    console.error('Error validating project existence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export function validateProjectIdFormat(req: Request, res: Response, next: NextFunction) {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid project ID format" });
  }

  next();
}
export function validateProjectBody(req: Request, res: Response, next: NextFunction) {
  const { projectName, clientName, description } = req.body;

  if (!projectName || !clientName || !description) {
    return res.status(400).json({
      error: "projectName, clientName and description are required",
    });
  }

  next();
}


