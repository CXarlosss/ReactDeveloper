import mongoose, { Schema, Document, Types } from 'mongoose';

// INTERFAZ TypeScript para tipado fuerte en toda la app
export interface INote extends Document {
  content: string;               // contenido de la nota
  createdBy: Types.ObjectId;     // referencia al usuario que la escribió
  task: Types.ObjectId;          // referencia a la tarea a la que pertenece
}

// ESQUEMA de Mongoose: define la estructura en la base de datos
const NoteSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true, // el contenido es obligatorio
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',     // referencia al modelo User
      required: true,
    },
    task: {
      type: Types.ObjectId,
      ref: 'Task',     // referencia al modelo Task
      required: true,
    },
  },
  { timestamps: true } // guarda createdAt y updatedAt automáticamente
);

// EXPORTACIÓN del modelo
const Note = mongoose.model<INote>('Note', NoteSchema);
export default Note;
