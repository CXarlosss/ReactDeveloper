import { useState } from "react";
import { Link } from "react-router-dom";
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token)
  }

  const handleComplete = (token: ConfirmToken['token']) => mutate({ token })

  return (
    <>
      {/* Título y subtítulo con tonos verdes */}
      <h1 className="text-5xl font-black text-green-700">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-green-700 mt-5">
        Ingresa el código que recibiste{' '}
        <span className="text-green-600 font-bold">por e-mail</span>
      </p>

      {/* Formulario */}
      <form className="space-y-8 p-10 bg-green-50 rounded-lg shadow-md mt-10">
        <label className="font-semibold text-xl text-center block text-green-800">
          Código de 6 dígitos
        </label>

        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-green-300 text-center text-green-800 placeholder-transparent focus:outline-green-500" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-green-300 text-center text-green-800 placeholder-transparent focus:outline-green-500" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-green-300 text-center text-green-800 placeholder-transparent focus:outline-green-500" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-green-300 text-center text-green-800 placeholder-transparent focus:outline-green-500" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-green-300 text-center text-green-800 placeholder-transparent focus:outline-green-500" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-green-300 text-center text-green-800 placeholder-transparent focus:outline-green-500" />
          </PinInput>
        </div>
      </form>

      {/* Navegación adicional */}
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-green-600 hover:underline transition"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
