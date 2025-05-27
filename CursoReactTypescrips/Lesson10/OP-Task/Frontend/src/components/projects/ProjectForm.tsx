import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "types";

// Define el tipo de las props para el componente ProjectForm.
type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>; // Función `register` de `react-hook-form` para registrar los inputs.
  errors: FieldErrors<ProjectFormData>; // Objeto `errors` de `react-hook-form` que contiene los errores de validación.
};

// Componente funcional `ProjectForm` que renderiza los campos comunes de un formulario de proyecto.
// Recibe `errors` y `register` como props para integrarse con `react-hook-form`.
export default function ProjectForm({ errors, register }: ProjectFormProps) {
  return (
    <>
      {/* Campo para el nombre del proyecto */}
      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Nombre del Proyecto
        </label>

        <input
          id="projectName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("projectName", {
            // Registra el input con `react-hook-form`.
            required: "El Titulo del Proyecto es obligatorio", // Mensaje de error si el campo está vacío.
          })}
        />

        {/* Muestra el mensaje de error si existe para 'projectName' */}

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>
      {/* Campo para el nombre del cliente */}
      <div className="mb-5 space-y-3">
        <label htmlFor="clientName" className="text-sm uppercase font-bold">
          Nombre Cliente
        </label>

        <input
          id="clientName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("clientName", {
            // Registra el input con `react-hook-form`.
            required: "El Nombre del Cliente es obligatorio", // Mensaje de error si el campo está vacío.
          })}
        />

        {/* Muestra el mensaje de error si existe para 'clientName' */}

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>
      {/* Campo para la descripción del proyecto */}
      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm uppercase font-bold">
          Descripción
        </label>

        <textarea
          id="description"
          className="w-full p-3  border border-gray-200"
          placeholder="Descripción del Proyecto"
          {...register("description", {
            // Registra el textarea con `react-hook-form`.
            required: "Una descripción del proyecto es obligatoria", // Mensaje de error si el campo está vacío.
          })}
        />

        {/* Muestra el mensaje de error si existe para 'description' */}
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
