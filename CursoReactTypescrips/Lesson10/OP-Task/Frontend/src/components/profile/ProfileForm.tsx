// Importa el hook `useForm` de 'react-hook-form' para la gestión del formulario.
import { useForm } from "react-hook-form"
// Importa el componente `ErrorMessage` para mostrar mensajes de error de validación.
import ErrorMessage from "../ErrorMessage"
// Importa las definiciones de tipos `User` y `UserProfileForm`.
import { User, UserProfileForm } from "@/types/index"
// Importa `useMutation` y `useQueryClient` de '@tanstack/react-query' para manejar mutaciones de datos y invalidar la caché.
import { useMutation, useQueryClient } from "@tanstack/react-query"
// Importa la función `updateProfile` de la API de perfil.
import { updateProfile } from "@/api/ProfileAPI"
// Importa la función `toast` de 'react-toastify' para mostrar notificaciones.
import { toast } from "react-toastify"

// Define las propiedades (props) que el componente `ProfileForm` espera recibir.
type ProfileFormProps = {
    data: User // Un objeto `User` que contiene los datos actuales del usuario.
}

// Define el componente funcional `ProfileForm`.
export default function ProfileForm({ data }: ProfileFormProps) {
    // Inicializa `useForm` con los valores predeterminados del formulario a partir de los datos del usuario.
    // Se especifica `UserProfileForm` como el tipo de datos del formulario.
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    // Obtiene una instancia de `QueryClient` para interactuar con la caché de TanStack Query.
    const queryClient = useQueryClient()
    // Configura la mutación para actualizar el perfil del usuario.
    const { mutate } = useMutation({
        mutationFn: updateProfile, // La función de la API que se ejecutará para actualizar el perfil.
        onError: (error) => toast.error(error.message), // Callback si la mutación falla: muestra un mensaje de error.
        onSuccess: (data) => {
            // Callback si la mutación es exitosa.
            toast.success(data) // Muestra un mensaje de éxito.
            // Invalida la caché de la consulta con la clave 'user' para que los datos del usuario se refetching (se actualicen).
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    // Función que se ejecuta al enviar el formulario para editar el perfil.
    const handleEditProfile = (formData: UserProfileForm) => mutate(formData) // Llama a la mutación `mutate` con los datos del formulario.

    // Renderiza el componente del formulario de perfil.
    return (
            <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1> 
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p> 

                <form
                    onSubmit={handleSubmit(handleEditProfile)} // Maneja el envío del formulario con `handleSubmit`.
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l" // Clases CSS para el estilo del formulario.
                    noValidate // Desactiva la validación HTML5 por defecto.
                >
                    {/* Campo para el nombre del usuario */}
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200"
                            {...register("name", { // Registra el input con `react-hook-form`.
                                required: "Nombre de usuario es obligatoro", // Regla de validación: campo requerido.
                            })}
                        />
                        {/* Muestra el mensaje de error si la validación del campo 'name' falla. */}
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    {/* Campo para el correo electrónico del usuario */}
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"  >E-mail</label>
                        <input
                            id="text" // ID del campo, que debería ser 'email' para coincidir con la etiqueta y el registro.
                            type="email" // Tipo de entrada de email.
                            placeholder="Tu Email" // Texto de marcador de posición.
                            className="w-full p-3  border border-gray-200"
                            {...register("email", { // Registra el input con `react-hook-form`.
                                required: "EL e-mail es obligatorio", // Regla de validación: campo requerido.
                                pattern: { // Regla de validación: patrón de email.
                                    value: /\S+@\S+\.\S+/, // Expresión regular para validar el formato del email.
                                    message: "E-mail no válido", // Mensaje de error si el patrón no coincide.
                                },
                            })}
                        />
                        {/* Muestra el mensaje de error si la validación del campo 'email' falla. */}
                        {errors.email && (<ErrorMessage>{errors.email.message}</ErrorMessage>)}
                    </div>
                    {/* Botón de envío del formulario */}
                    <input
                        type="submit"
                        value='Guardar Cambios' // Texto del botón.
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors" // Clases CSS para el estilo del botón.
                    />
                </form>
            </div> </>)
}