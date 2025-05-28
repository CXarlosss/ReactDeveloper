import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjects } from "@/api/ProjectAPI"
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'

export default function DashboardView() {

  const location = useLocation()
  const navigate = useNavigate()
  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })
  if (isLoading && authLoading) return 'Cargando...'
  if (data && user) return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-sm">
        Mis Proyectos
      </h1>
      <p className="text-xl text-blue-600 mb-8">
        Maneja y administra tus proyectos
      </p>

      <nav className="mb-10 text-center">
        <Link
          to="/projects/create"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-lg transition"
        >
          ➕ Nuevo Proyecto
        </Link>
      </nav>

      {data?.length ? (
        <ul
          role="list"
          className="divide-y divide-gray-200 border border-gray-200 bg-white shadow-xl rounded-xl"
        >
          {data.map((project) => (
            <li
              key={project._id}
              className="flex justify-between items-start gap-6 px-6 py-8"
            >
              <div className="flex-1 space-y-2">
                <div>
                  {isManager(project.manager, user?._id) ? (
                    <span className="text-xs font-bold uppercase bg-blue-100 text-blue-700 border border-blue-300 rounded-full px-4 py-1 inline-block">
                      Manager
                    </span>
                  ) : (
                    <span className="text-xs font-bold uppercase bg-blue-50 text-blue-500 border border-blue-200 rounded-full px-4 py-1 inline-block">
                      Colaborador
                    </span>
                  )}
                </div>

                <Link
                  to={`/projects/${project._id}`}
                  className="text-2xl text-blue-800 font-bold hover:underline block"
                >
                  {project.projectName}
                </Link>
                <p className="text-sm text-gray-500">
                  Cliente: {project.clientName}
                </p>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>

              <Menu as="div" className="relative">
                <Menu.Button className="p-2 text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Opciones</span>
                  <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
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
                      <Link
                        to={`/projects/${project._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Ver Proyecto
                      </Link>
                    </Menu.Item>
                    {isManager(project.manager, user?._id) && (
                      <>
                        <Menu.Item>
                          <Link
                            to={`/projects/${project._id}/edit`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Editar Proyecto
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            onClick={() =>
                              navigate(
                                `${location.pathname}?deleteProject=${project._id}`
                              )
                            }
                          >
                            Eliminar Proyecto
                          </button>
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-20">
          No hay proyectos aún{" "}
          <Link
            to="/projects/create"
            className="text-blue-700 font-bold underline"
          >
            Crear Proyecto
          </Link>
        </p>
      )}

      <DeleteProjectModal />
    </div>
  );
}
