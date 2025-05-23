// src/routes/projectRoutes.ts
import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController.js";

const router = Router();

// Rutas para /api/projects

// Obtener todos los proyectos
router.get("/", ProjectController.getAllProjects);

// Crear un nuevo proyecto
router.post("/", ProjectController.createProject);

// Obtener un solo proyecto por ID
router.get("/:id", ProjectController.getProjectById); 

// Actualizar un proyecto por ID
router.put("/:id", ProjectController.updateProject);

// Eliminar un proyecto por ID
router.delete("/:id", ProjectController.deleteProject);


export default router;