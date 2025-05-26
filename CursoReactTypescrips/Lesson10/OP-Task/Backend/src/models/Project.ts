import mongoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose';
import Task, { ITask } from './Task';
import { IUser } from './User';
import Note from './Note';

// INTERFAZ para definir el tipo de un Proyecto en TypeScript
export interface IProject extends Document {
  projectName: string;                             // nombre del proyecto
  clientName: string;                              // cliente que lo encarga
  description: string;                             // descripción general
  tasks: PopulatedDoc<ITask & Document>[];         // array de tareas referenciadas
  manager: PopulatedDoc<IUser & Document>;         // usuario que creó el proyecto
  team: PopulatedDoc<IUser & Document>[];          // otros usuarios invitados
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: 'Task', // se puede hacer .populate('tasks')
      },
    ],
    manager: {
      type: Types.ObjectId,
      ref: 'User',  // creador del proyecto
    },
    team: [
      {
        type: Types.ObjectId,
        ref: 'User',  // miembros invitados al proyecto
      },
    ],
  },
  { timestamps: true } // createdAt, updatedAt
);
ProjectSchema.pre('deleteOne', {document: true}, async function() {
    const projectId = this._id
    if(!projectId) return

    const tasks = await Task.find({ project: projectId })
    for(const task of tasks) {
        await Note.deleteMany({ task: task.id})
    }

    await Task.deleteMany({project: projectId})
})

const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project