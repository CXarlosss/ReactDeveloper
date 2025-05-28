import ProjectForm from "./ProjectForm";
import { Link, useNavigate } from "react-router-dom";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

// Define el tipo de las props para el componente EditProjectForm.
type EditProjectFormProps = {
    data: ProjectFormData; // Datos del proyecto a editar, con el formato esperado por el formulario.
    projectId: Project["_id"]; // El ID del proyecto que se está editando.
};

// Componente funcional para editar un proyecto existente.
export default function EditProjectForm(
    {

    // Props que recibe el componente: los datos del proyecto y su ID.
    data,
    projectId,
}: EditProjectFormProps) {
    const navigate = useNavigate(); // Hook para la navegación programática. // Inicializa `useForm` de `react-hook-form` con los valores predeterminados del proyecto existente.
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({
        defaultValues: {
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description,
        },
    });
    const queryClient = useQueryClient(); // Obtiene una instancia de `QueryClient` para gestionar la caché de TanStack Query. // Configura la mutación para actualizar un proyecto.
    const { mutate } = useMutation({
        mutationFn: updateProject, // La función de la API que se encarga de la actualización.
        onError: (error) => {
            toast.error(error.message); // Muestra un mensaje de error si la mutación falla.
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] }); // Invalida la caché de todos los proyectos para que se refetching.
            queryClient.invalidateQueries({ queryKey: ["editProject", projectId] }); // Invalida la caché del proyecto específico que se acaba de editar.
            toast.success(data); // Muestra un mensaje de éxito.
            navigate("/"); // Navega de vuelta a la página principal de proyectos.
        },
    }); // Función que se ejecuta al enviar el formulario.

    const handleForm = (formData: ProjectFormData) => {
        // Prepara los datos para la mutación, incluyendo el formData y el projectId.
        const data = {
            formData,
            projectId,
        };
        mutate(data); // Llama a la función de mutación con los datos preparados.
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>{" "}
                {/* Título de la página. */}
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Llena el siguiente formulario para editar el proyecto
                </p>{" "}
                {/* Descripción. */}
                {/* Enlace para volver a la lista de proyectos. */}
                <nav className="my-5 ">
                    <Link
                        className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to="/"
                    >
                        Volver a Proyectos
                    </Link>
                </nav>
                {/* Formulario de edición del proyecto. */}
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)} // Maneja el envío del formulario.
                    noValidate // Desactiva la validación HTML5 por defecto.
                >
                    {/* Componente `ProjectForm` que contiene los campos del formulario. */}
                    <ProjectForm
                        register={register} // Pasa la función `register` de `react-hook-form`.
                        errors={errors} // Pasa los errores de validación del formulario.
                    />
                    {/* Botón para guardar los cambios del proyecto. */}
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className=" bg-blue-600 hover:bg-blue-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />{" "}
                </form>
            </div>
        </>
    );
}
