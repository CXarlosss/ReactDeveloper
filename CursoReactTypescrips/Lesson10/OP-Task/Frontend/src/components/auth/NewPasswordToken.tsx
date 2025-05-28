// Importa el componente `Link` de 'react-router-dom' para la navegación declarativa.
import { Link } from "react-router-dom";
// Importa los componentes `PinInput` y `PinInputField` de '@chakra-ui/pin-input' para crear un campo de entrada de PIN.
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
// Importa el hook `useMutation` de '@tanstack/react-query' para manejar la lógica de mutación de datos (ej. enviar el token).
import { useMutation } from "@tanstack/react-query";
// Importa la definición de tipo `ConfirmToken` desde el directorio de tipos.
import { ConfirmToken } from "@/types/index";
// Importa la función `validateToken` de la API de autenticación.
import { validateToken } from "@/api/AuthAPI";
// Importa la función `toast` de 'react-toastify' para mostrar notificaciones al usuario.
import { toast } from "react-toastify";

// Define las propiedades (props) que el componente `NewPasswordToken` espera recibir.
type NewPasswordTokenProps = {
  token: ConfirmToken["token"]; // El token actual que se está ingresando en el PinInput.
  setToken: React.Dispatch<React.SetStateAction<string>>; // Función para actualizar el estado del token.
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>; // Función para indicar si el token es válido.
};
// Define el componente funcional `NewPasswordToken`.
export default function NewPasswordToken({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordTokenProps) {
  // Inicializa la mutación para validar el token.
  const { mutate } = useMutation({
    mutationFn: validateToken, // La función de la API que se ejecutará para validar el token.
    onError: (error) => {
      // Callback que se ejecuta si la mutación falla. Muestra un mensaje de error.
      toast.error(error.message);
    },
    onSuccess: (data) => {
      // Callback que se ejecuta si la mutación es exitosa.
      toast.success(data); // Muestra un mensaje de éxito.
      setIsValidToken(true); // Establece el estado `isValidToken` a true, permitiendo avanzar al siguiente paso.
    },
  }); // Función que se ejecuta cuando el valor del PinInput cambia.

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token); // Actualiza el estado `token` con el nuevo valor ingresado.
  }; // Función que se ejecuta cuando el usuario ha completado de ingresar el PIN.

  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token }); // Llama a la mutación para validar el token. // Renderiza el componente.

  return (
    <>
      {/* Formulario para ingresar el código de 6 dígitos */}

      <form
        className="space-y-8 p-10 rounded-lg bg-white mt-10" // Clases CSS para el estilo del formulario.
      >
        <label
          className="font-normal text-2xl text-center block" // Clases CSS para el estilo de la etiqueta.
        >
          Código de 6 dígitos
        </label>

        <div className="flex justify-center gap-5">
          {/* Componente PinInput de Chakra UI para la entrada del PIN. */}

          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            {/* Seis campos individuales para cada dígito del PIN. */}

            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />

            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />

            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />

            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />

            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />

            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>
      {/* Sección de navegación para solicitar un nuevo código. */}

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/forgot-password" // Ruta a la que enlaza.
          className="text-center text-gray-300 font-normal" // Clases CSS para el estilo del enlace.
        >
          ¿No recibiste el código? Solicitar un nuevo código
        </Link>
      </nav>
    </>
  );
}
