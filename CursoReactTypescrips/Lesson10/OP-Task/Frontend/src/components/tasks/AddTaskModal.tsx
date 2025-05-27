import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TaskForm from './TaskForm';
import { TaskFormData } from '@/types/index';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

// Componente modal para agregar una nueva tarea.
export default function AddTaskModal() {
    const navigate = useNavigate() // Hook para la navegación programática.

    // Determina si el modal debe mostrarse basado en los query params de la URL.
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask') // Obtiene el valor del parámetro 'newTask'.
    const show = modalTask ? true : false // Si 'newTask' existe, el modal se muestra.

    // Obtiene el projectId de los parámetros de la ruta.
    const params = useParams()
    const projectId = params.projectId!

    // Valores iniciales para el formulario de la tarea.
    const initialValues: TaskFormData = {
        name: '',
        description: ''
    }
    // Inicializa `useForm` de `react-hook-form` con los valores iniciales.
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({ defaultValues: initialValues })

    const queryClient = useQueryClient() // Obtiene una instancia de `QueryClient` para gestionar la caché de TanStack Query.
    // Configura la mutación para crear una nueva tarea.
    const { mutate } = useMutation({
        mutationFn: createTask, // La función de la API que se encarga de la creación de la tarea.
        onError: (error) => {
            toast.error(error.message) // Muestra un mensaje de error si la mutación falla.
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] }) // Invalida la caché del proyecto para que se refetching.
            toast.success(data) // Muestra un mensaje de éxito.
            reset() // Resetea el formulario a sus valores iniciales.
            navigate(location.pathname, { replace: true }) // Redirige a la URL sin el query param, reemplazando la entrada del historial.
        }
    })

    // Función que se ejecuta al enviar el formulario para crear una nueva tarea.
    const handleCreateTask = (formData: TaskFormData) => {
        // Prepara los datos para la mutación, incluyendo el formData y el projectId.
        const data = {
            formData,
            projectId
        }
        mutate(data) // Llama a la función de mutación con los datos preparados.
    }

    return (
        <>
            {/* Transición para mostrar/ocultar el modal */}
            <Transition appear show={show} as={Fragment}>
                {/* Componente Dialog de Headless UI para el modal. */}
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    {/* Transición para el fondo oscuro del modal */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" /> {/* Fondo oscuro semi-transparente */}
                    </Transition.Child>

                    {/* Contenedor principal del modal que permite el desplazamiento */}
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            {/* Transición para el panel del modal */}
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                {/* Panel del diálogo con estilos */}
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    {/* Título del modal */}
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    {/* Texto de introducción */}
                                    <p className="text-xl font-bold">Llena el formulario y crea 
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    {/* Formulario para crear una nueva tarea */}
                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleCreateTask)} // Maneja el envío del formulario.
                                        noValidate // Desactiva la validación HTML5 por defecto.
                                    >
                                        {/* Componente `TaskForm` que contiene los campos del formulario. */}
                                        <TaskForm
                                            register={register} // Pasa la función `register` de `react-hook-form`.
                                            errors={errors} // Pasa los errores de validación del formulario.
                                        />

                                        {/* Botón para guardar la nueva tarea. */}
                                        <input
                                            type="submit"
                                            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                            value='Guardar Tarea'
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
