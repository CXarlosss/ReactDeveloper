// src/routes/projectRoutes.ts
import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController.js";
import { TaskController } from "../controllers/TaskController.js";

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

//Routes for tasks in a project

// Crear tarea
router.post("/:projectId/tasks", TaskController.createTask);

// Obtener tareas de un proyecto
router.get("/:projectId/tasks", TaskController.getTasks);

// Actualizar tarea por ID
router.put("/tasks/:taskId", TaskController.updateTask);

// Eliminar tarea por ID
router.delete("/tasks/:taskId", TaskController.deleteTask);

export default router;