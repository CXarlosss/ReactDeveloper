import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getProjects } from "@/api/ProjectAPI";
import { useAuth } from '@/hooks/useAuth';
import { isManager } from '@/utils/policies';
import DeleteProjectModal from '@/components/projects/DeleteProjectModal';

export default function DashboardView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading: authLoading } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  if (isLoading || authLoading) return <p className="text-green-700">Cargando proyectos...</p>;

  if (data && user) return (
    <>
      <h1 className="text-5xl font-black text-green-700">Mis Proyectos</h1>
      <p className="text-2xl font-light text-green-700 mt-5">Maneja y administra tus proyectos</p>

      <nav className="my-5">
        <Link
          className="bg-green-600 hover:bg-green-700 px-10 py-3 text-white text-xl font-bold rounded transition-colors"
          to='/projects/create'
        >
          Nuevo Proyecto
        </Link>
      </nav>

      {data.length ? (
        <ul role="list" className="divide-y divide-green-100 border border-green-100 mt-10 bg-green-50 shadow-md rounded-lg">
          {data.map((project) => (
            <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <div className='mb-2'>
                    {isManager(project.manager, user._id) ? (
                      <p className='font-bold text-xs uppercase bg-green-100 text-green-700 border-2 border-green-500 rounded-lg inline-block py-1 px-5'>
                        Manager
                      </p>
                    ) : (
                      <p className='font-bold text-xs uppercase bg-emerald-50 text-emerald-500 border-2 border-emerald-500 rounded-lg inline-block py-1 px-5'>
                        Colaborador
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/projects/${project._id}`}
                    className="text-green-800 cursor-pointer hover:underline text-3xl font-bold"
                  >
                    {project.projectName}
                  </Link>

                  <p className="text-sm text-green-600">Cliente: {project.clientName}</p>
                  <p className="text-sm text-green-600">{project.description}</p>
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-green-200 focus:outline-none">
                      <Menu.Item>
                        <Link
                          to={`/projects/${project._id}`}
                          className="block px-3 py-1 text-sm leading-6 text-green-800"
                        >
                          Ver Proyecto
                        </Link>
                      </Menu.Item>

                      {isManager(project.manager, user._id) && (
                        <>
                          <Menu.Item>
                            <Link
                              to={`/projects/${project._id}/edit`}
                              className="block px-3 py-1 text-sm leading-6 text-green-800"
                            >
                              Editar Proyecto
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type="button"
                              className="block px-3 py-1 text-sm leading-6 text-red-600 hover:bg-green-50 w-full text-left"
                              onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                            >
                              Eliminar Proyecto
                            </button>
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20 text-green-700">
          No hay proyectos aún.{' '}
          <Link to="/projects/create" className="text-green-600 font-bold underline">
            Crear Proyecto
          </Link>
        </p>
      )}

      <DeleteProjectModal />
    </>
  );
}
