import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AddMemberModal from "@/components/team/AddMemberModal";
import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import { toast } from 'react-toastify';

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
    }
  });

  if (isLoading) return <p className="text-green-700">Cargando equipo...</p>;
  if (isError) return <Navigate to={'/404'} />;

  if (data) return (
    <>
      <h1 className="text-5xl font-black text-green-700">Administrar Equipo</h1>
      <p className="text-2xl font-light text-green-700 mt-5">
        Administra el equipo de trabajo para este proyecto
      </p>

      <nav className="my-5 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          className="bg-green-600 hover:bg-green-700 px-10 py-3 text-white text-xl font-bold rounded transition"
          onClick={() => navigate(location.pathname + '?addMember=true')}
        >
          Agregar Colaborador
        </button>

        <Link
          to={`/projects/${projectId}`}
          className="bg-green-500 hover:bg-green-600 px-10 py-3 text-white text-xl font-bold rounded transition"
        >
          Volver a Proyecto
        </Link>
      </nav>

      <h2 className="text-5xl font-black my-10 text-green-700">Miembros actuales</h2>

      {data.length ? (
        <ul role="list" className="divide-y divide-green-100 border border-green-100 mt-10 bg-green-50 shadow-md rounded-lg">
          {data.map((member) => (
            <li key={member._id} className="flex justify-between gap-x-6 px-5 py-8">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <p className="text-2xl font-bold text-green-800">
                    {member.name}
                  </p>
                  <p className="text-sm text-green-600">
                    {member.email}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-green-500 hover:text-green-700 transition">
                    <span className="sr-only">Opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-green-300 focus:outline-none">
                      <Menu.Item>
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-green-50"
                          onClick={() => mutate({ projectId, userId: member._id })}
                        >
                          Eliminar del Proyecto
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20 text-green-600">No hay miembros en este equipo</p>
      )}

      <AddMemberModal />
    </>
  );
}
