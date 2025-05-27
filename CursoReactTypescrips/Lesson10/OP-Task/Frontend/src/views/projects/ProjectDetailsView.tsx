import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getFullProject } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsView() {
  const { data: user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getFullProject(projectId),
    retry: false
  });

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading || authLoading) return <p className="text-green-700">Cargando proyecto...</p>;
  if (isError) return <Navigate to="/404" />;

  if (data && user) return (
    <>
      <h1 className="text-5xl font-black text-green-700">{data.projectName}</h1>
      <p className="text-2xl font-light text-green-700 mt-5">{data.description}</p>

      {isManager(data.manager, user._id) && (
        <nav className="my-5 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 px-10 py-3 text-white text-xl font-bold rounded transition"
            onClick={() => navigate(location.pathname + '?newTask=true')}
          >
            Agregar Tarea
          </button>

          <Link
            to="team"
            className="bg-green-500 hover:bg-green-600 px-10 py-3 text-white text-xl font-bold rounded transition"
          >
            Colaboradores
          </Link>
        </nav>
      )}

      <TaskList tasks={data.tasks} canEdit={canEdit} />

      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  );
}
