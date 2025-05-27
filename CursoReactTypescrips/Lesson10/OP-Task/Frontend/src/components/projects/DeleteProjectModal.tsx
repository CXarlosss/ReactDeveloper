import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { CheckPasswordForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { deleteProject } from "@/api/ProjectAPI";

export default function DeleteProjectModal() {
    // Valores iniciales para el formulario de verificación de contraseña.
    const initialValues: CheckPasswordForm = {
        password: "",
    }; // Hooks de React Router para la navegación y la ubicación actual.
    const location = useLocation();
    const navigate = useNavigate(); // Obtiene los parámetros de la URL para determinar si el modal debe mostrarse.

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get("deleteProject")!; // ID del proyecto a eliminar.
    const show = deleteProjectId ? true : false; // `true` si `deleteProject` está en los query params, `false` en caso contrario. // Inicializa `useForm` para la gestión del formulario de contraseña.

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues }); // Inicializa `useQueryClient` para interactuar con la caché de TanStack Query.

    const queryClient = useQueryClient(); // Mutación para verificar la contraseña del usuario.
    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword, // Función de la API para verificar la contraseña.
        onError: (error) => toast.error(error.message), // Muestra un mensaje de error si la verificación falla.
    }); // Mutación para eliminar el proyecto.

    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject, // Función de la API para eliminar el proyecto.
        onError: (error) => {
            toast.error(error.message); // Muestra un mensaje de error si la eliminación falla.
        },
        onSuccess: (data) => {
            toast.success(data); // Muestra un mensaje de éxito si la eliminación es exitosa.
            queryClient.invalidateQueries({ queryKey: ["projects"] }); // Invalida la caché de proyectos para forzar un refetch.
            navigate(location.pathname, { replace: true }); // Redirige a la URL sin el query param, reemplazando la entrada del historial.
        },
    }); // Manejador de envío del formulario. Primero verifica la contraseña, luego elimina el proyecto.

    const handleForm = async (formData: CheckPasswordForm) => {
        await checkUserPasswordMutation.mutateAsync(formData); // Espera a que la verificación de contraseña se complete.
        await deleteProjectMutation.mutateAsync(deleteProjectId); // Luego, procede con la eliminación del proyecto.
    };

    return (
        <Transition appear show={show} as={Fragment}>
            {/* Componente Dialog de Headless UI para el modal. */}

            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => navigate(location.pathname, { replace: true })}
            >
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
                    <div className="fixed inset-0 bg-black/60" />{" "}
                    {/* Fondo oscuro semi-transparente */}
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
                                <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                                    Eliminar Proyecto{" "}
                                </Dialog.Title>
                                {/* Texto de confirmación */}
                                <p className="text-xl font-bold">
                                    Confirma la eliminación del proyecto
                                    <span className="text-fuchsia-600">
                                        colocando tu password
                                    </span>
                                </p>

                                {/* Formulario para ingresar la contraseña */}

                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={handleSubmit(handleForm)} // Maneja el envío del formulario.
                                    noValidate // Desactiva la validación HTML5 por defecto.
                                >
                                    {/* Campo de entrada para la contraseña */}

                                    <div className="flex flex-col gap-3">
                                        <label className="font-normal text-2xl" htmlFor="password">
                                            Password
                                        </label>

                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password Inicio de Sesión"
                                            className="w-full p-3  border-gray-300 border"
                                            {...register("password", {
                                                // Registra el input con `react-hook-form`.
                                                required: "El password es obligatorio", // Regla de validación: campo requerido.
                                            })}
                                        />
                                        {/* Muestra el mensaje de error si la validación del campo 'password' falla. */}

                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

                                    {/* Botón de envío del formulario */}

                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value="Eliminar Proyecto"
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
