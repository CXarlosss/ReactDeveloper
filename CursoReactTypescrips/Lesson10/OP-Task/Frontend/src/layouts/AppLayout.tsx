import { Link, Outlet, Navigate } from 'react-router-dom' // Navegación y subrutas
import { ToastContainer } from 'react-toastify' // Contenedor de notificaciones
import 'react-toastify/dist/ReactToastify.css' // Estilos por defecto de react-toastify
import Logo from '@/components/Logo' // Componente del logo
import NavMenu from "@/components/NavMenu";
import { useAuth } from '@/hooks/useAuth' // Hook personalizado para verificar si el usuario está autenticado


export default function AppLayout() {
    // Llamamos al hook personalizado que probablemente use React Query
    const { data, isError, isLoading } = useAuth()

    // Mientras se carga la info del usuario, mostramos un mensaje
    if (isLoading) return 'Cargando...'

    // Si hay error (no autenticado, token inválido...), redirigimos al login
    if (isError) {
        return <Navigate to='/auth/login' />
    }
    // Si todo va bien y tenemos datos del usuario:
    if (data) return (
        <>
            {/* HEADER */}
            <header className='bg-gray-800 py-5'>
                <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-64'>
                        <Link to={'/'}>
                            <Logo /> {/* Logo clicable */}
                        </Link>
                    </div>

                    <NavMenu name={data.name} /> {/* Menú de navegación con nombre del usuario */}
                </div>
            </header>
            {/* CONTENIDO PRINCIPAL: donde se renderizan las rutas hijas */}
            <section className='max-w-screen-2xl mx-auto mt-10 p-5'>
                <Outlet />
            </section>
            {/* CONTENEDOR GLOBAL DE TOASTS */}
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
