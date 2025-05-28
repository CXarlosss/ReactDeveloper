import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {

  const initialValues: RequestConfirmationCodeForm = {
    email: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues
  });

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

  return (
    <>
      {/* Encabezado */}
      <h1 className="text-5xl font-black text-green-700">Solicitar Código de Confirmación</h1>
      <p className="text-2xl font-light text-green-700 mt-5">
        Coloca tu e-mail para recibir{' '}
        <span className="text-green-600 font-bold">un nuevo código</span>
      </p>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 mt-10 bg-green-50 rounded-lg shadow-md"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="email" className="font-semibold text-xl text-green-800">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 rounded-lg border border-green-300 text-green-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
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
          value='Enviar Código'
          className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-semibold text-lg cursor-pointer transition"
        />
      </form>

      {/* Enlaces de navegación */}
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-green-600 hover:underline transition"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          to='/auth/forgot-password'
          className="text-center text-green-600 hover:underline transition"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
