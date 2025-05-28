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

const tokenSchema = new Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true // crea automáticamente createdAt y updatedAt
  }
);

// TTL de 10 minutos basado en `createdAt`
tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

const Token = mongoose.model<IToken>('Token', tokenSchema);
export default Token;
