// Importamos lo necesario de Mongoose y TypeScript para crear el schema y la interfaz
import mongoose, { Schema, Document, Types } from "mongoose";
// INTERFAZ que define el tipo de documento de Token
// Se usa para tener tipado fuerte en controladores o middleware

export interface IToken extends Document {
  token: string;           // El token generado (normalmente aleatorio o JWT)
  user: Types.ObjectId;    // Referencia al usuario asociado
  createdAt: Date;         // Fecha de creación (implícita)
}
// ESQUEMA de Mongoose que define la estructura del token en la base de datos

const tokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true, // El token es obligatorio
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',     // Relación con el modelo User
  },
  expiresAt: {
    type: Date,
    default: Date.now(), // Se pone la fecha actual al crearlo
    expires: '10m'       // TTL: este documento se elimina automáticamente a los 10 minutos
  }
});
// Exportamos el modelo con su tipado
const Token = mongoose.model<IToken>('Token', tokenSchema);
export default Token;
