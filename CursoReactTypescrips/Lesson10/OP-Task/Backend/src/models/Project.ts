import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task.js";

export type ProjectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
tasks: Types.ObjectId[];
};

const projectSchema = new Schema<ProjectType>(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<ProjectType>("Project", projectSchema);
export default Project;
