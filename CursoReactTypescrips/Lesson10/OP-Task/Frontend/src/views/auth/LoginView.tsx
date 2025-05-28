import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { UserLoginForm } from "@/types/index"; // Asegúrate que esta ruta es correcta
import ErrorMessage from "@/components/ErrorMessage"; // Asegúrate que esta ruta es correcta
import { authenticateUser } from "@/api/AuthAPI"; // Asegúrate que esta ruta es correcta
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/') // Redirige al dashboard o página principal tras login exitoso
      toast.success("¡Bienvenido de vuelta!"); // Mensaje de éxito opcional
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    // Contenedor principal para el fondo y centrado
    <div className=" bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8"> {/* Aumentado max-w para más espacio */}
        
        {/* Encabezado */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 pb-2">
            Iniciar Sesión
          </h1>
          <p className="text-lg sm:text-xl font-light text-slate-300 mt-4">
            Comienza a planear tus proyectos {''}
            <span className="text-indigo-400 font-semibold">
              iniciando sesión en este formulario
            </span>
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-6 p-8 sm:p-10 bg-white/5 backdrop-blur-md shadow-2xl rounded-xl border border-slate-700" // Efecto glassmorphism sutil
          noValidate
        >
          <div className="flex flex-col gap-5">
            <label
              htmlFor="email" // Buena práctica añadir htmlFor
              className="font-medium text-lg text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Tu Email de Registro"
              className="w-full p-3 bg-slate-800/60 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm appearance-none placeholder-slate-400"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <label
              htmlFor="password" // Buena práctica añadir htmlFor
              className="font-medium text-lg text-slate-200"
            >
              Password
            </label>
            <input
              id="password" // Buena práctica añadir id
              type="password"
              placeholder="Tu Password de Registro"
              className="w-full p-3 bg-slate-800/60 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm appearance-none placeholder-slate-400"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Iniciar Sesión'
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 w-full p-3.5 text-white font-semibold text-lg rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-indigo-500/40"
          />
        </form>

        {/* Navegación inferior */}
        <nav className="mt-10 flex flex-col space-y-4 items-center">
          <Link
            to={'/auth/register'}
            className="text-center text-sm text-slate-400 hover:text-indigo-400 hover:underline font-medium transition-colors duration-300"
          >
            ¿No tienes cuenta? Crear Una
          </Link>
          <Link
            to={'/auth/forgot-password'}
            className="text-center text-sm text-slate-400 hover:text-indigo-400 hover:underline font-medium transition-colors duration-300"
          >
            ¿Olvidaste tu contraseña? Reestablecer
          </Link>
        </nav>
      </div>
    </div>
  )
}