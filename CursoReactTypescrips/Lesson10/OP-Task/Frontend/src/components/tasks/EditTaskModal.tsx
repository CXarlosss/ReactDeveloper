// Importaciones necesarias
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'; // Para el modal animado
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Mutación + caché
import { Task, TaskFormData } from '@/types/index'; // Tipos TypeScript
import { useForm } from 'react-hook-form'; // Hook para manejar formularios
import TaskForm from './TaskForm'; // Componente reutilizable del formulario
import { updateTask } from '@/api/TaskAPI'; // Función que llama a la API
import { toast } from 'react-toastify'; // Para mostrar notificaciones

// Props: recibe los datos actuales de la tarea y su ID
type EditTaskModalProps = {
  data: Task;
  taskId: Task['_id'];
};

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {
  const navigate = useNavigate();

  // Obtenemos el ID del proyecto desde la URL
  const params = useParams();
  const projectId = params.projectId!;

  // Inicializamos el formulario con los datos de la tarea actual
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  // React Query para refrescar la caché cuando actualicemos los datos
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTask, // función que hace PUT/PATCH a la API
    onError: (error) => {
      toast.error(error.message); // notificación si falla
    },
    onSuccess: (data) => {
      // invalidamos queries para que se recargue la info en pantalla
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      toast.success(data); // notificación de éxito
      reset(); // limpiamos el formulario
      navigate(location.pathname, { replace: true }); // cerramos el modal
    },
  });

  // Handler cuando se envía el formulario
  const handleEditTask = (formData: TaskFormData) => {
    const data = { projectId, taskId, formData };
    mutate(data); // enviamos a la API
  };

  return (
    // Transition de Headless UI para animar el modal
    <Transition appear show={true} as={Fragment}>
      {/* El modal se cierra navegando de nuevo a la ruta sin query */}
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate(location.pathname, { replace: true })}
      >
        {/* Fondo oscuro del modal */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Caja del modal animada */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                  Editar Tarea
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Realiza cambios a una tarea en{' '}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                {/* Formulario de edición */}
                <form
                  className="mt-10 space-y-3"
                  onSubmit={handleSubmit(handleEditTask)}
                  noValidate
                >
                  {/* Campos del formulario */}
                  <TaskForm register={register} errors={errors} />

                  {/* Botón de enviar */}
                  <input
                    type="submit"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer"
                    value="Guardar Tarea"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
