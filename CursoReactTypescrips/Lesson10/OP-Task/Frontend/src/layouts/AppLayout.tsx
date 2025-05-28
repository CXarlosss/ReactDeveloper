import { Link, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'
// Notificación con estilo personalizado

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth()

  if (isLoading) return <p className="text-center mt-20 text-gray-500 text-lg">Cargando datos del usuario...</p>

  if (isError) return <Navigate to='/auth/login' />

  if (data) {
    return (
      <>
        {/* HEADER */}
        <header className='bg-blue-500 text-white shadow-md py-4'>
          <div className='max-w-screen-2xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-4'>
            <Link to='/' className='w-48'>
              <Logo />
            </Link>

            <NavMenu name={data.name} />
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className='max-w-screen-2xl mx-auto px-6 py-8'>
          <Outlet />
        </main>

        {/* TOASTS */}
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </>
    )
  }

  return null
}
