import { Fragment} from 'react'
import { Menu, Transition} from '@headlessui/react'
import { EllipsisVerticalIcon} from '@heroicons/react/20/solid'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AddMemberModal from "@/components/team/AddMemberModal"
import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI"
import { toast } from 'react-toastify'


export default function ProjectTeamView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError} = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: removeUserFromProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
        }
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to={'/404'} />
    if(data) return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-sm">
        Administrar Equipo
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Administra el equipo de trabajo para este proyecto
      </p>

      <nav className="mb-10 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-lg transition"
          onClick={() => navigate(location.pathname + "?addMember=true")}
        >
          ➕ Agregar Colaborador
        </button>

        <Link
          to={`/projects/${projectId}`}
          className="bg-blue-100 hover:bg-blue-200 text-blue-900 text-lg font-semibold px-8 py-3 rounded-lg transition"
        >
          ← Volver al Proyecto
        </Link>
      </nav>

      <h2 className="text-4xl font-bold text-blue-800 mb-6">Miembros actuales</h2>

      {data.length ? (
        <ul
          role="list"
          className="divide-y divide-gray-100 border border-gray-100 mt-6 bg-white shadow-xl rounded-xl"
        >
          {data.map((member) => (
            <li key={member._id} className="flex justify-between items-center px-6 py-6">
              <div className="flex flex-col space-y-1">
                <p className="text-xl font-bold text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>

              <Menu as="div" className="relative">
                <Menu.Button className="p-2 text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Opciones</span>
                  <EllipsisVerticalIcon className="h-7 w-7" aria-hidden="true" />
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      <button
                        type="button"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
                        onClick={() =>
                          mutate({ projectId: projectId!, userId: member._id })
                        }
                      >
                        Eliminar del Proyecto
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-20">No hay miembros en este equipo</p>
      )}

      <AddMemberModal />
    </div>
  );
}