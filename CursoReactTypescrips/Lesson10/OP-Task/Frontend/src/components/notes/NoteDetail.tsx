// Importa la función `deleteNote` de la API de notas.
import { deleteNote } from "@/api/NoteAPI";
// Importa el hook `useAuth` para obtener la información del usuario autenticado.
import { useAuth } from "@/hooks/useAuth";
// Importa la definición de tipo `Note` desde el directorio de tipos.
import { Note } from "@/types/index";
// Importa la función `formatDate` de las utilidades para formatear fechas.
import { formatDate } from "@/utils/utils";
// Importa `useMutation` y `useQueryClient` de '@tanstack/react-query' para manejar mutaciones y la invalidación de caché.
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Importa `useMemo` de React para memoizar valores y evitar recálculos innecesarios.
import { useMemo } from "react";
// Importa `useLocation` y `useParams` de 'react-router-dom' para acceder a la URL.
import { useLocation, useParams } from "react-router-dom";
// Importa la función `toast` de 'react-toastify' para mostrar notificaciones.
import { toast } from "react-toastify";

// Define las propiedades (props) que el componente `NoteDetail` espera recibir.
type NoteDetailProps = {
  note: Note; // Un objeto `Note` que contiene los detalles de la nota.
};

// Define el componente funcional `NoteDetail`.
export default function NoteDetail({ note }: NoteDetailProps) {
  // Obtiene los datos del usuario autenticado y el estado de carga usando el hook `useAuth`.
  const { data, isLoading } = useAuth(); // `useMemo` para determinar si el usuario actual puede eliminar la nota. // La nota se puede eliminar si el ID del usuario autenticado coincide con el ID del creador de la nota.
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]); // `useParams` hook para obtener parámetros de la URL, como el ID del proyecto.
  const params = useParams(); // `useLocation` hook para obtener el objeto de ubicación, que contiene la cadena de consulta.
  const location = useLocation(); // Crea un objeto `URLSearchParams` a partir de la cadena de consulta de la URL.
  const queryParams = new URLSearchParams(location.search); // Extrae el ID del proyecto de los parámetros de la URL. Se usa el operador `!` para asegurar que no es `null` o `undefined`.
  const projectId = params.projectId!; // Extrae el ID de la tarea de los parámetros de la cadena de consulta. Se usa el operador `!` para asegurar que no es `null` o `undefined`.
  const taskId = queryParams.get("viewTask")!; // Obtiene una instancia de `QueryClient` para interactuar con la caché de TanStack Query.

  const queryClient = useQueryClient(); // Configura la mutación para eliminar una nota.
  const { mutate } = useMutation({
    mutationFn: deleteNote, // La función de la API que se ejecutará para eliminar la nota.
    onError: (error) => toast.error(error.message), // Callback si la mutación falla: muestra un mensaje de error.
    onSuccess: (data) => {
      // Callback si la mutación es exitosa.
      toast.success(data); // Muestra un mensaje de éxito. // Invalida la caché de la consulta con la clave 'task' y el `taskId` para que los datos de la tarea se refetching (se actualicen).
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  }); // Si los datos del usuario están cargando, muestra un mensaje de "Cargando...".

  if (isLoading) return "Cargando..."; // Renderiza los detalles de la nota.

  return (
    <div className="p-3 flex justify-between items-center">

      <div>
      
        <p>
      {note.content} 
          <span className="font-bold">{note.createdBy.name}</span>{" "}
          {/* Muestra el contenido de la nota y el nombre del creador. */}

        </p>
   
        <p className="text-xs text-slate-500">
        {formatDate(note.createdAt)}
          {/* Muestra la fecha de creación de la nota formateada. */}
      
        </p>
   
      </div>

      {/* Muestra el botón de eliminar solo si el usuario actual tiene permiso (`canDelete` es true). */}
  
      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors" // Clases CSS para el estilo del botón.
          onClick={() => mutate({ projectId, taskId, noteId: note._id })} // Llama a la mutación `mutate` al hacer clic, pasando los IDs necesarios.
        >
          Eliminar
        </button>
      )}
     
    </div>
  );
}
