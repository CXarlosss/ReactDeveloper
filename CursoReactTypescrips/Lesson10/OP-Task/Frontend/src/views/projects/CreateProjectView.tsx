import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

export default function CreateProjectView() {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues
  });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    }
  });

  const handleForm = (formData: ProjectFormData) => mutate(formData);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black text-green-700">Crear Proyecto</h1>
      <p className="text-2xl font-light text-green-700 mt-5">
        Llena el siguiente formulario para crear un proyecto
      </p>

      {/* Navegación */}
      <nav className="my-5">
        <Link
          className="bg-green-500 hover:bg-green-600 px-10 py-3 text-white text-xl font-bold rounded transition-colors"
          to='/'
        >
          ← Volver a Proyectos
        </Link>
      </nav>

      {/* Formulario */}
      <form
        className="mt-10 bg-green-50 shadow-md p-10 rounded-lg space-y-5"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm
          register={register}
          errors={errors}
        />

        <input
          type="submit"
          value="Crear Proyecto"
          className="bg-green-600 hover:bg-green-700 w-full p-3 text-white uppercase font-bold rounded cursor-pointer transition"
        />
      </form>
    </div>
  );
}
