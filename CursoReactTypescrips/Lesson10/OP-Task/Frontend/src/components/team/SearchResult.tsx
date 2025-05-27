// Importaciones necesarias para la lógica de mutación, navegación y feedback
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMember } from "@/types/index"
import { addUserToProject } from "@/api/TeamAPI"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

// Props del componente: usuario encontrado y función para limpiar estado
type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {
    const navigate = useNavigate()

    // Obtenemos el ID del proyecto desde la URL (React Router)
    const params = useParams()
    const projectId = params.projectId!

    // Acceso a la caché de React Query
    const queryClient = useQueryClient()

    // Mutación para agregar el usuario al proyecto
    const { mutate } = useMutation({
        mutationFn: addUserToProject, // función que hace POST en la API
        onError: (error) => {
            toast.error(error.message) // muestra mensaje de error si falla
        },
        onSuccess: (data) => {
            toast.success(data) // notifica éxito
            reset() // limpia el formulario y el estado de búsqueda
            navigate(location.pathname, { replace: true }) // cierra el modal si lo hay
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] }) // refresca lista del equipo
        }
    })

    // Al hacer clic en "Agregar al Proyecto", se llama a esta función
    const handleAddUserToProject = () => {
        const data = {
            projectId,
            id: user._id
        }
        mutate(data) // ejecuta la mutación con los datos requeridos
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            
            <div className="flex justify-between items-center border p-4 rounded shadow mt-4 bg-white">
                <p className="text-lg font-medium">{user.name}</p>

                <button
                    className="text-purple-600 hover:bg-purple-100 px-6 py-2 font-bold rounded transition"
                    onClick={handleAddUserToProject}
                >
                    Agregar al Proyecto
                </button>
            </div>
        </>
    )
}
