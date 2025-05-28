// Importa el hook `useNavigate` de 'react-router-dom' para la navegación programática.
import { useNavigate } from "react-router-dom";
// Importa el hook `useForm` de 'react-hook-form' para la gestión de formularios.
import { useForm } from "react-hook-form";
// Importa `useMutation` de '@tanstack/react-query' para manejar mutaciones de datos (ej. peticiones POST, PUT, DELETE).
import { useMutation } from "@tanstack/react-query";
// Importa las definiciones de tipos para `ConfirmToken` y `NewPasswordForm`.
import type { ConfirmToken, NewPasswordForm } from "../../types";
// Importa el componente `ErrorMessage` para mostrar mensajes de error.
import ErrorMessage from "@/components/ErrorMessage";
// Importa la función `updatePasswordWithToken` de la API de autenticación.
import { updatePasswordWithToken } from "@/api/AuthAPI";
// Importa la función `toast` de 'react-toastify' para mostrar notificaciones.
import { toast } from "react-toastify";

// Define los tipos de las props que el componente `NewPasswordForm` va a recibir.
type NewPasswordFormProps = {
  token: ConfirmToken["token"]; // El token de confirmación extraído del tipo `ConfirmToken`.
};

// Define el componente funcional `NewPasswordForm`.
export default function NewPasswordForm({ token }: NewPasswordFormProps) {

  // Inicializa `useNavigate` para poder redirigir al usuario después de una acción.
  const navigate = useNavigate(); // Define los valores iniciales para el formulario de nueva contraseña.
  const initialValues: NewPasswordForm = {
    password: "", // Contraseña inicial vacía.
    password_confirmation: "", // Confirmación de contraseña inicial vacía.
  }; // Inicializa `useForm` con los valores iniciales y desestructura las funciones y estados necesarios.
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues }); // Configura la mutación para actualizar la contraseña con un token.

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken, // La función que se ejecutará para la mutación.
    onError: (error) => {
      toast.error(error.message); // Muestra un mensaje de error si la mutación falla.
    },
    onSuccess: (data) => {
      toast.success(data); // Muestra un mensaje de éxito si la mutación es exitosa.
      reset(); // Resetea el formulario.
      navigate("/auth/login"); // Redirige al usuario a la página de login.
    },
  }); // Función que se ejecuta al enviar el formulario de nueva contraseña.

  const handleNewPassword = (formData: NewPasswordForm) => {
    // Combina los datos del formulario con el token recibido.
    const data = {
      formData,
      token,
    };
    mutate(data); // Llama a la función de mutación con los datos.
  }; // Observa el valor del campo 'password' para validación en tiempo real.

  const password = watch("password"); // Renderiza el componente.

  return (
    <>
     {/* Formulario HTML para la nueva contraseña */}
      <form
        onSubmit={handleSubmit(handleNewPassword)} // Maneja el envío del formulario con `handleSubmit`.
        className="space-y-8 p-10  bg-white mt-10" // Clases CSS para estilos.
        noValidate // Desactiva la validación HTML5 por defecto.
      >
         {/* Campo para la contraseña */}{" "}
        <div className="flex flex-col gap-5">
     
          <label className="font-normal text-2xl">Password</label>
          
          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              // Registra el input con `react-hook-form`.
              required: "El Password es obligatorio", // Regla de validación: campo requerido.
              minLength: {
                // Regla de validación: longitud mínima.
                value: 8, // Valor mínimo de 8 caracteres.
                message: "El Password debe ser mínimo de 8 caracteres", // Mensaje de error.
              },
            })}
          />
          
          {/* Muestra el mensaje de error si la validación del campo 'password' falla. */}
          
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        
        </div>
        {/* Campo para repetir la contraseña */}
        <div className="flex flex-col gap-5">
         
          <label className="font-normal text-2xl">Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              // Registra el input con `react-hook-form`.
              required: "Repetir Password es obligatorio", // Regla de validación: campo requerido.
              validate: (value) =>
                value === password || "Los Passwords no son iguales", // Regla de validación: compara con el campo 'password'.
            })}
          />
        
          {/* Muestra el mensaje de error si la validación del campo 'password_confirmation' falla. */}
      
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
         
        </div>
     {/* Botón de envío del formulario */}
        <input
          type="submit"
          value="Establecer Password" // Texto del botón.
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer" // Clases CSS para estilos.
        />
    
      </form>
     
    </>
  );
}
