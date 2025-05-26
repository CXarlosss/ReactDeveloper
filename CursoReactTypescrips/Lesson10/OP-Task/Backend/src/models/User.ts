// Importamos Mongoose y tipos para TypeScript
import mongoose, { Schema, Document } from "mongoose";
// INTERFAZ que define el tipo de usuario
// Se usa en controladores, autenticación, middlewares, etc.
export interface IUser extends Document {
  email: string;         // Correo electrónico del usuario
  password: string;      // Contraseña (hashed)
  name: string;          // Nombre visible
  confirmed: boolean;    // Si ha confirmado su email (útil para registro)
}
// ESQUEMA de Mongoose para el modelo User

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,      // Obligatorio
    lowercase: true,     // Se guarda en minúsculas
    unique: true         // No puede haber dos usuarios con el mismo email
  },
  password: {
    type: String,
    required: true       // Se espera que esté encriptada (bcrypt, etc.)
  },
  name: {
    type: String,
    required: true       // Nombre real o visible en el dashboard
  },
  confirmed: {
    type: Boolean,
    default: false       // Se marca como `true` solo cuando valida el email
  },
});
// Exportamos el modelo ya listo para usar con tipado fuerte
const User = mongoose.model<IUser>('User', userSchema);
export default User;
