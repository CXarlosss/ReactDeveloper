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
  const { projectId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getFullProject(projectId!),
    retry: false
  });

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading || authLoading) return 'Cargando...';
  if (isError) return <Navigate to="/404" />;

  if (data && user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-sm">
          {data.projectName}
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          {data.description}
        </p>

        {isManager(data.manager, user._id) && (
          <nav className="mb-10 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-lg transition focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              ➕ Agregar Tarea
            </button>

            <Link
              to="team"
              className="bg-blue-100 hover:bg-blue-200 text-blue-900 text-lg font-semibold px-8 py-3 rounded-lg transition focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              👥 Colaboradores
            </Link>
          </nav>
        )}

        <section className="mb-10">
          <TaskList tasks={data.tasks} canEdit={canEdit} />
        </section>

        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </div>
    );
  }

  return null;
}
