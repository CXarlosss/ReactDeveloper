// src/models/Project.ts
import mongoose, { Schema, Document } from "mongoose";

export type ProjectType = Document & { // <-- ¡Aquí está el cambio! Ahora se llama ProjectType
  projectName: string;
  clientName: string;
  description: string;
};

const projectSchema = new Schema<ProjectType>({
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
}, {
    timestamps: true 
});

const Project = mongoose.model<ProjectType>("Project", projectSchema);
export default Project;