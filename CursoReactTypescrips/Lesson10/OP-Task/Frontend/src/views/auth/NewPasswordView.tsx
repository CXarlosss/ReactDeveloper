import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('');
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      {/* Título y subtítulo */}
      <h1 className="text-5xl font-black text-green-700">Reestablecer Password</h1>
      <p className="text-2xl font-light text-green-700 mt-5">
        Ingresa el código que recibiste{' '}
        <span className="text-green-600 font-bold">por email</span>
      </p>

      {/* Renderizado condicional: formulario o input de código */}
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}
