// src/routes/projectRoutes.ts
import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController.js";
import { TaskController } from "../controllers/TaskController.js";
import { validateProjectExist,validateProjectIdFormat,validateProjectBody} from "../middleware/project.js";

const router = Router();
// Rutas para /api/projects
// Crear proyecto
router.post("/", validateProjectBody, ProjectController.createProject);
// Actualizar
router.put("/:id", validateProjectIdFormat, validateProjectExist, validateProjectBody, ProjectController.updateProject);
// Obtener uno
router.get("/:id", validateProjectIdFormat, validateProjectExist, ProjectController.getProjectById);
// Eliminar
router.delete("/:id", validateProjectIdFormat, validateProjectExist, ProjectController.deleteProject);
//Routes for tasks in a project
// Crear tarea en un proyecto existente
router.post("/:projectId/tasks", validateProjectExist, TaskController.createTask);
// Obtener tareas de un proyecto existente
router.get("/:projectId/tasks", validateProjectExist, TaskController.getTasks);
// Actualizar tarea por ID
router.put("/tasks/:taskId", TaskController.updateTask);
// Eliminar tarea por ID
router.delete("/tasks/:taskId", TaskController.deleteTask);

export default router;