// src/controllers/ProjectController.ts
import type { Request, Response } from "express";

import Project, { ProjectType } from "../models/Project.js"; 
import { isValidObjectId } from "mongoose"; 

export class ProjectController {

  static async getAllProjects(req: Request, res: Response) {
    try {
      // Lógica REAL para obtener todos los proyectos de la base de datos
      const projects = await Project.find(); // Encuentra todos los documentos en la colección 'projects'
      res.status(200).json({ data: projects }); // Envía los proyectos como respuesta
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      res.status(500).json({ message: "Error al obtener los proyectos" });
    }
  }

  static async createProject(req: Request, res: Response) {
    try {
      // Lógica REAL para crear un nuevo proyecto
      // CAMBIO AQUÍ: Usamos ProjectType en lugar de IProject
      const newProjectData: ProjectType = req.body; // Los datos del nuevo proyecto vendrán en el cuerpo de la solicitud
      const newProject = await Project.create(newProjectData); // Crea un nuevo documento en la base de datos
      res.status(201).json({ message: "Proyecto creado exitosamente", data: newProject }); // Envía el proyecto creado como respuesta
    } catch (error) {
      console.error("Error al crear proyecto:", error);
      // Puedes añadir más lógica de error aquí, por ejemplo, si faltan campos requeridos
      res.status(400).json({ message: "Error al crear el proyecto. Datos inválidos." });
    }
  }

  static async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params; // Obtener el ID del proyecto de los parámetros de la URL

      // Validar si el ID es un ObjectId válido de MongoDB
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID de proyecto inválido." });
      }

      // Lógica REAL para obtener un proyecto por ID
      const project = await Project.findById(id); // Busca un documento por su ID

      if (!project) {
        return res.status(404).json({ message: "Proyecto no encontrado." }); // Si no se encuentra, devuelve 404
      }

      res.status(200).json({ data: project }); // Envía el proyecto encontrado
    } catch (error) {
      console.error("Error al obtener proyecto por ID:", error);
      res.status(500).json({ message: "Error al obtener el proyecto." });
    }
  }

  static async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params; // Obtener el ID del proyecto de los parámetros de la URL
      // CAMBIO AQUÍ: Usamos Partial<ProjectType> en lugar de Partial<IProject>
      const updatedData: Partial<ProjectType> = req.body;   // Los datos para actualizar vendrán en el cuerpo de la solicitud (Partial para permitir actualización parcial)

      // Validar si el ID es un ObjectId válido de MongoDB
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID de proyecto inválido." });
      }

      // Lógica REAL para actualizar un proyecto por ID
      // { new: true } devuelve el documento actualizado
      const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedProject) {
        return res.status(404).json({ message: "Proyecto no encontrado para actualizar." }); // Si no se encuentra, devuelve 404
      }

      res.status(200).json({ message: "Proyecto actualizado exitosamente", data: updatedProject }); // Envía el proyecto actualizado
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
      res.status(500).json({ message: "Error al actualizar el proyecto." });
    }
  }

  static async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params; // Obtener el ID del proyecto de los parámetros de la URL

      // Validar si el ID es un ObjectId válido de MongoDB
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID de proyecto inválido." });
      }

      // Lógica REAL para eliminar un proyecto por ID
      const deletedProject = await Project.findByIdAndDelete(id); // Elimina un documento por su ID

      if (!deletedProject) {
        return res.status(404).json({ message: "Proyecto no encontrado para eliminar." }); // Si no se encuentra, devuelve 404
      }

      // 204 No Content es una respuesta estándar para eliminaciones exitosas sin cuerpo de respuesta
      res.status(204).send(); // No envía contenido, solo el estado de éxito

    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      res.status(500).json({ message: "Error al eliminar el proyecto." });
    }
  }
}