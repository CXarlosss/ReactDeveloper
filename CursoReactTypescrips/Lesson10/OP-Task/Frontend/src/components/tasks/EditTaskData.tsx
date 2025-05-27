// Importamos herramientas de React Router y React Query
import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getTaskById } from "@/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {
    // Obtenemos los parámetros de la ruta, por ejemplo /projects/:projectId
    const params = useParams()
    const projectId = params.projectId! // "!" asegura que no es null (aunque deberías validar)

    // Obtenemos los parámetros de la URL que están después del signo "?", ej: ?editTask=123
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')! // Obtenemos el ID de la tarea que queremos editar

    // Realizamos una petición con React Query para obtener los datos de la tarea por ID
    const { data, isError } = useQuery({
        queryKey: ['task', taskId], // Clave única para almacenar esta consulta en caché
        queryFn: () => getTaskById({ projectId, taskId }), // Función que trae los datos desde la API
        enabled: !!taskId // Solo se ejecuta si taskId existe (evita errores en render inicial)
    })

    // Si ocurre un error al obtener la tarea, redirigimos a una página 404
    if (isError) return <Navigate to={'/404'} />

    // Si se obtuvieron los datos correctamente, mostramos el modal de edición
    if (data) return <EditTaskModal data={data} taskId={taskId} />
}
