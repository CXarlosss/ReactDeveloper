import mongoose, { Schema, Document, Types } from "mongoose";
export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  tasks: Types.ObjectId[];
}
const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project", // Referencia al modelo Project
      required: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
  }
);
const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;

