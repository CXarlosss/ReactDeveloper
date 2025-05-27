import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues
  })

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      {/* Título principal */}
      <h1 className="text-5xl font-black text-green-700">Iniciar Sesión</h1>
      <p className="text-2xl font-light text-green-700 mt-5">
        Comienza a planear tus proyectos{' '}
        <span className="text-green-600 font-bold">iniciando sesión en este formulario</span>
      </p>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-green-50 rounded-lg shadow-md"
        noValidate
      >
        {/* Campo Email */}
        <div className="flex flex-col gap-5">
          <label className="font-semibold text-xl text-green-800" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border border-green-300 rounded text-green-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
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

        {/* Campo Password */}
        <div className="flex flex-col gap-5">
          <label className="font-semibold text-xl text-green-800">
            Password
          </label>
          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3 border border-green-300 rounded text-green-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        {/* Botón de envío */}
        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-green-600 hover:bg-green-700 w-full p-3 text-white font-semibold text-lg rounded cursor-pointer transition"
        />
      </form>

      {/* Navegación */}
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/register'
          className="text-center text-green-600 hover:underline transition"
        >
          ¿No tienes cuenta? Crear una
        </Link>

        <Link
          to='/auth/forgot-password'
          className="text-center text-green-600 hover:underline transition"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}
