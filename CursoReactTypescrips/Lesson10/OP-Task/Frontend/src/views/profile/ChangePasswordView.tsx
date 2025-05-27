import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { UpdateCurrentUserPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "@/api/ProfileAPI";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: initialValues
  });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data)
  });

  const password = watch('password');
  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => mutate(formData);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-5xl font-black text-green-700">Cambiar Password</h1>
      <p className="text-2xl font-light text-green-700 mt-5">
        Utiliza este formulario para cambiar tu contraseña
      </p>

      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="mt-14 space-y-5 bg-green-50 shadow-md p-10 rounded-lg"
        noValidate
      >
        {/* Password actual */}
        <div className="space-y-2">
          <label htmlFor="current_password" className="text-sm uppercase font-bold text-green-800">
            Password Actual
          </label>
          <input
            id="current_password"
            type="password"
            placeholder="Password Actual"
            className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("current_password", {
              required: "El password actual es obligatorio"
            })}
          />
          {errors.current_password && (
            <ErrorMessage>{errors.current_password.message}</ErrorMessage>
          )}
        </div>

        {/* Nuevo Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm uppercase font-bold text-green-800">
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nuevo Password"
            className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("password", {
              required: "El Nuevo Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres"
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        {/* Confirmar Password */}
        <div className="space-y-2">
          <label htmlFor="password_confirmation" className="text-sm uppercase font-bold text-green-800">
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("password_confirmation", {
              required: "Este campo es obligatorio",
              validate: value => value === password || "Los Passwords no son iguales"
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        {/* Botón */}
        <input
          type="submit"
          value="Cambiar Password"
          className="bg-green-600 hover:bg-green-700 w-full p-3 text-white uppercase font-bold rounded cursor-pointer transition"
        />
      </form>
    </div>
  );
}
