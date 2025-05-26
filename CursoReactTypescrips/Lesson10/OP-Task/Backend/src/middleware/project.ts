import type { Request, Response, NextFunction } from 'express';
import Project from '../models/Project.js';

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

