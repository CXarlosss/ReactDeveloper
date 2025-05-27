import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues
  });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

  return (
    <>
      {/* Título principal */}
      <h1 className="text-5xl font-black text-green-700">Reestablecer Password</h1>
      <p className="text-2xl font-light text-green-700 mt-5">
        ¿Olvidaste tu password? Coloca tu email{' '}
        <span className="text-green-600 font-bold">y restablece tu contraseña</span>
      </p>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 mt-10 bg-green-50 rounded-lg shadow-md"
        noValidate
      >
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
              required: "El Email de registro es obligatorio",
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

        <input
          type="submit"
          value='Enviar Instrucciones'
          className="bg-green-600 hover:bg-green-700 w-full p-3 text-white font-semibold text-lg rounded cursor-pointer transition"
        />
      </form>

      {/* Enlaces adicionales */}
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-green-600 hover:underline transition"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link
          to='/auth/register'
          className="text-center text-green-600 hover:underline transition"
        >
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  )
}
