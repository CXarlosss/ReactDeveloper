import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

export default function CreateProjectView() {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => mutate(formData);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-900 text-center drop-shadow-sm">
        Nuevo Proyecto
      </h1>
      <p className="text-lg sm:text-xl text-blue-600 text-center mt-3 text-opacity-80">
        Completa los campos para comenzar tu proyecto
      </p>

      <nav className="my-8 text-center">
        <Link
          className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full font-semibold transition shadow-sm"
          to="/"
        >
          ← Volver a Proyectos
        </Link>
      </nav>

      <form
        className="mt-6 bg-white border border-blue-100 shadow-md p-8 sm:p-10 rounded-2xl space-y-6"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm register={register} errors={errors} />

        <input
          type="submit"
          value="Crear Proyecto"
          className="bg-blue-700 hover:bg-blue-800 w-full py-3 text-white uppercase font-bold rounded-lg cursor-pointer transition-all duration-200 ring-2 ring-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
        />
      </form>
    </div>
  );
}
