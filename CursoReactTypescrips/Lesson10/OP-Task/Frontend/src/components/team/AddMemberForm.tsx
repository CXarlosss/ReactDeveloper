import { useForm } from "react-hook-form"; // Manejo de formularios
import { useParams } from "react-router-dom"; // Para obtener el projectId de la URL
import { useMutation } from "@tanstack/react-query"; // Para manejar peticiones POST/async
import ErrorMessage from "../ErrorMessage"; // Componente visual para mostrar errores
import { TeamMemberForm } from "@/types/index"; // Tipo TypeScript para el formulario
import { findUserByEmail } from "@/api/TeamAPI"; // Función que hace la búsqueda por email
import SearchResult from "./SearchResult"; // Componente que muestra el usuario encontrado
export default function AddMemberForm() {
    // Valores iniciales del formulario
    const initialValues: TeamMemberForm = {
        email: ''
    }

    // Obtener el projectId desde la URL (vía React Router)
    const params = useParams()
    const projectId = params.projectId!
    // Hook de react-hook-form con valores iniciales
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })
    // Mutación con React Query: buscar usuario por email
    const mutation = useMutation({
        mutationFn: findUserByEmail
    })
    // Función que se ejecuta al enviar el formulario
    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = { projectId, formData } // Enviamos también el ID del proyecto
        mutation.mutate(data) // Ejecuta la mutación
    }

    // Resetear formulario y estado de mutación
    const resetData = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        reset(), mutation.reset()
    }
    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >
                <div className="flex flex-col gap-3">
                    <label className="font-normal text-2xl" htmlFor="name">
                        E-mail de Usuario
                    </label>
                    
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3 border border-gray-300"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />

                    {/* Mostrar error si no pasa la validación */}
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>
                <input
                    type="submit"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>
            <div className="mt-10">
                {mutation.isPending && <p className="text-center">Cargando...</p>}

                {mutation.error && (
                    <p className="text-center text-red-600">{mutation.error.message}</p>
                )}

                {mutation.data && (
                    <SearchResult user={mutation.data} reset={resetData} />
                )}
            </div>
        </>
    )
}
