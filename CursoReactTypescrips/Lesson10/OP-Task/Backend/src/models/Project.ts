// src/models/Project.ts
import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { ITask } from "./Task.js";

export type ProjectType = Document & {
  // <-- ¡Aquí está el cambio! Ahora se llama ProjectType
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[]; // Opcional, si quieres relacionar tareas con el proyecto
};

const projectSchema = new Schema<ProjectType>(
  {
    projectName: {
      type: String,
      required: true,
      trim: true, // Elimina espacios en blanco
    },
    clientName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<ProjectType>("Project", projectSchema);
export default Project;
