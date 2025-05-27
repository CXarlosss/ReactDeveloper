import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "@/views/ErrorMessage";

type FormFields = {
  projectName: string;
  clientName: string;
  description: string;
};


export default function CreateProjectView() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    defaultValues: {
      projectName: "",
      clientName: "",
      description: "",
    },
  });
  const handleForm = (data: FormFields) => {
    console.log("Datos del proyecto:", data);
    // Aquí puedes hacer la petición a tu API o lo que necesites
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Crear Proyecto
      </h1>

      <form
        onSubmit={handleSubmit(handleForm)}
        className="bg-white p-6 shadow-md rounded-lg space-y-6"
      >
        {/* Nombre del Proyecto */}
        <div>
          <label
            htmlFor="projectName"
            className="text-sm font-semibold text-gray-700 uppercase"
          >
            Nombre del Proyecto
          </label>
          <input
            id="projectName"
            type="text"
            placeholder="Nombre del Proyecto"
            className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition"
            {...register("projectName", {
              required: "El título del proyecto es obligatorio",
            })}
          />
          {errors.projectName && (
            <ErrorMessage>{errors.projectName.message}</ErrorMessage>
          )}
        </div>

        {/* Nombre del Cliente */}
        <div>
          <label
            htmlFor="clientName"
            className="text-sm font-semibold text-gray-700 uppercase"
          >
            Nombre del Cliente
          </label>
          <input
            id="clientName"
            type="text"
            placeholder="Nombre del Cliente"
            className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition"
            {...register("clientName", {
              required: "El nombre del cliente es obligatorio",
            })}
          />
          {errors.clientName && (
            <ErrorMessage>{errors.clientName.message}</ErrorMessage>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray-700 uppercase"
          >
            Descripción
          </label>
          <textarea
            id="description"
            placeholder="Descripción del Proyecto"
            rows={4}
            className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition resize-none"
            {...register("description", {
              required: "La descripción del proyecto es obligatoria",
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Link
            to="/dashboard"
            className="text-purple-600 hover:underline text-sm"
          >
            ← Volver al Dashboard
          </Link>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Crear Proyecto
          </button>
        </div>
      </form>
    </div>
  );
}
