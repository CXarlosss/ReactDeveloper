import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
  name: User['name']
}

export default function NavMenu({ name }: NavMenuProps) {
  const queryClient = useQueryClient()

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-2 p-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white transition">
        <Bars3Icon className="w-6 h-6" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-20 mt-3 w-64 -translate-x-1/2 lg:-translate-x-48">
          <div className="rounded-lg bg-white shadow-xl ring-1 ring-gray-200 p-4 space-y-2 text-sm font-medium text-gray-800">
            <p className="text-center font-semibold text-blue-800">
              👋 Hola, {name}
            </p>
            <hr className="border-gray-200" />

            <Link to="/profile" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-800 transition">
              👤 Mi Perfil
            </Link>
            <Link to="/" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-800 transition">
              📁 Mis Proyectos
            </Link>
            <button
              onClick={logout}
              className="block w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50 hover:text-red-700 transition"
            >
              🔓 Cerrar Sesión
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
