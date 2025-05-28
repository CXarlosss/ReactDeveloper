import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation} from '@tanstack/react-query'
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

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
    <div className=" bg-[#f8f9fc] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="bg-[#6a7bff] w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#2d3748] mt-4">Recupera tu contraseña</h1>
          <p className="mt-3 text-[#718096]">
            ¿Olvidaste tu contraseña? Ingresa tu email {''}
            <span className="text-[#6a7bff] font-medium">y te enviaremos instrucciones</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="space-y-6 bg-white rounded-xl shadow-sm p-8 transition-all duration-300 hover:shadow-md"
          noValidate
        >
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-[#2d3748] mb-1"
                htmlFor="email"
              >Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="w-full p-3 border border-[#e2e8f0] rounded-lg focus:border-[#6a7bff] focus:ring-2 focus:ring-[#6a7bff]/30 transition-all"
                {...register("email", {
                  required: "El Email es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email no válido",
                  },
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#6a7bff] hover:bg-[#5a6be5] text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
              >
                Enviar instrucciones
              </button>
            </div>
          </div>
        </form>

        <nav className="mt-8 space-y-3 text-center">
          <Link
            to='/auth/login'
            className="block text-sm text-[#718096] hover:text-[#6a7bff] transition-colors"
          >
            ¿Ya tienes cuenta? Iniciar sesión
          </Link>

          <Link
            to='/auth/register'
            className="block text-sm text-[#718096] hover:text-[#6a7bff] transition-colors"
          >
            ¿No tienes cuenta? Regístrate ahora
          </Link>
        </nav>
      </div>
    </div>
  );
}