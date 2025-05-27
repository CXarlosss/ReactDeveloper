import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({
    defaultValues: initialValues
  });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      <h1 className="text-5xl font-black text-green-700">Crear Cuenta</h1>
      <p className="text-2xl font-light text-green-700 mt-5">
        Llena el formulario para{' '}
        <span className="text-green-600 font-bold">crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 bg-green-50 rounded-lg shadow-md mt-10"
        noValidate
      >
        {/* Email */}
        <div className="flex flex-col gap-5">
          <label htmlFor="email" className="font-semibold text-xl text-green-800">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border border-green-300 rounded text-green-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Nombre */}
        <div className="flex flex-col gap-5">
          <label className="font-semibold text-xl text-green-800">Nombre</label>
          <input
            type="text"
            placeholder="Nombre de Registro"
            className="w-full p-3 border border-green-300 rounded text-green-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-5">
          <label className="font-semibold text-xl text-green-800">Password</label>
          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3 border border-green-300 rounded text-green-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        {/* Confirmar Password */}
        <div className="flex flex-col gap-5">
          <label className="font-semibold text-xl text-green-800">Repetir Password</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3 border border-green-300 rounded text-green-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>

        {/* Botón de envío */}
        <input
          type="submit"
          value='Registrarme'
          className="bg-green-600 hover:bg-green-700 w-full p-3 text-white font-semibold text-lg rounded cursor-pointer transition"
        />
      </form>

      {/* Navegación */}
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-green-600 hover:underline transition"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link
          to="/auth/forgot-password"
          className="text-center text-green-600 hover:underline transition"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}
