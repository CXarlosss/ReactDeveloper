// Importamos Mongoose y tipos para TypeScript
import mongoose, { Schema, Document, Types } from 'mongoose'

// Importamos el modelo Note para usar en el middleware de borrado
import Note from './Note'
// Definimos los posibles estados de una tarea como constantes
const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const
// Creamos un tipo TypeScript que acepta solo los valores del enum de estados
export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]
// INTERFAZ TypeScript para usar en controladores, rutas, etc.
export interface ITask extends Document {
    name: string;                       // Nombre de la tarea
    description: string;                // Descripción de la tarea
    project: Types.ObjectId;            // Referencia al proyecto padre
    status: TaskStatus;                 // Estado actual de la tarea
    completedBy: {                      // Historial de quién la completó y en qué estado
        user: Types.ObjectId;
        status: TaskStatus;
    }[];
    notes: Types.ObjectId[];            // Referencia a las notas asociadas
}
// ESQUEMA Mongoose: estructura de la colección de tareas
export const TaskSchema : Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project' // Referencia al modelo Project
    },
    status: {
        type: String,
        enum: Object.values(taskStatus), // Solo permite los valores válidos del enum
        default: taskStatus.PENDING
    },
    completedBy: [ // Lista de usuarios que han marcado como completada esta tarea (útil para proyectos colaborativos)
        {
            user: {
                type: Types.ObjectId,
                ref: 'User',
                default: null
            },
            status: {
                type: String,
                enum: Object.values(taskStatus),
                default: taskStatus.PENDING
            }
        }
    ],
    notes: [
        {
            type: Types.ObjectId,
            ref: 'Note' // Relación con las notas de esta tarea
        }
    ]
}, {timestamps: true}) // Añade automáticamente createdAt y updatedAt
// MIDDLEWARE que se ejecuta al eliminar una tarea
// ✔️ Elimina todas las notas asociadas a la tarea antes de borrarla de la BD

TaskSchema.pre('deleteOne', { document: true }, async function () {
    const taskId = this._id;
    if (!taskId) return;

    await Note.deleteMany({ task: taskId });
});
// EXPORTACIÓN del modelo
const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
