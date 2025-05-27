// Importa la definición de tipo `NoteFormData` desde el directorio de tipos.
import { NoteFormData } from "@/types/index";
// Importa el hook `useForm` de 'react-hook-form' para la gestión del formulario.
import { useForm } from "react-hook-form";
// Importa el componente `ErrorMessage` para mostrar mensajes de error de validación.
import ErrorMessage from "../ErrorMessage";
// Importa `useMutation` y `useQueryClient` de '@tanstack/react-query' para manejar mutaciones de datos y invalidar la caché de consultas.
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Importa la función `createNote` de la API de notas.
import { createNote } from "@/api/NoteAPI";
// Importa la función `toast` de 'react-toastify' para mostrar notificaciones.
import { toast } from "react-toastify";
// Importa los hooks `useLocation` y `useParams` de 'react-router-dom' para acceder a la URL.
import { useLocation, useParams } from "react-router-dom";

// Define el componente funcional `AddNoteForm`.
export default function AddNoteForm() {
  // `useParams` hook para obtener parámetros de la URL, como el ID del proyecto.
  const params = useParams(); // `useLocation` hook para obtener el objeto de ubicación, que contiene la cadena de consulta.
  const location = useLocation(); // Crea un objeto `URLSearchParams` a partir de la cadena de consulta de la URL.

  const queryParams = new URLSearchParams(location.search); // Extrae el ID del proyecto de los parámetros de la URL. Se usa el operador `!` para asegurar que no es `null` o `undefined`.

  const projectId = params.projectId!; // Extrae el ID de la tarea de los parámetros de la cadena de consulta. Se usa el operador `!` para asegurar que no es `null` o `undefined`.
  const taskId = queryParams.get("viewTask")!; // Define los valores iniciales para el formulario de la nota.

  const initialValues: NoteFormData = {
    content: "", // El contenido de la nota inicialmente vacío.
  }; // Inicializa `useForm` con los valores iniciales y desestructura las funciones y estados necesarios.

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues }); // Obtiene una instancia de `QueryClient` para interactuar con la caché de TanStack Query.

  const queryClient = useQueryClient(); // Configura la mutación para crear una nueva nota.
  const { mutate } = useMutation({
    mutationFn: createNote, // La función de la API que se ejecutará para crear la nota.
    onError: (error) => {
      // Callback que se ejecuta si la mutación falla. Muestra un mensaje de error.
      toast.error(error.message);
    },
    onSuccess: (data) => {
      // Callback que se ejecuta si la mutación es exitosa.
      toast.success(data); // Muestra un mensaje de éxito. // Invalida la caché de la consulta con la clave 'task' y el `taskId` para que los datos de la tarea se refetching.
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  }); // Función que se ejecuta al enviar el formulario para añadir una nota.
  const handleAddNote = (formData: NoteFormData) => {
    // Llama a la mutación `mutate` con los IDs del proyecto y la tarea, y los datos del formulario.
    mutate({ projectId, taskId, formData });
    reset(); // Resetea el formulario después de enviar la nota.
  }; // Renderiza el componente del formulario.

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)} // Maneja el envío del formulario con `handleSubmit`.
      className="space-y-3" // Clases CSS para el estilo del formulario.
      noValidate // Desactiva la validación HTML5 por defecto.
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content">
          Crear Nota
        </label>{" "}
        {/* Etiqueta del campo de entrada. */}
        <input
          id="content" // ID del campo de entrada.
          type="text" // Tipo de entrada de texto.
          placeholder="Contenido de la nota" // Texto de marcador de posición.
          className="w-full p-3 border border-gray-300" // Clases CSS para el estilo del campo.
          {...register("content", {
            // Registra el input con `react-hook-form`.
            required: "El Contenido de la nota es obligatorio", // Regla de validación: campo requerido.
          })}
        />
        {/* Muestra el mensaje de error si la validación del campo 'content' falla. */}
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit" // Tipo de botón de envío.
        value="Crear Nota" // Texto del botón.
        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer" // Clases CSS para el estilo del botón.
      />
    </form>
  );
}
