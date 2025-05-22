// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/MainLayout';
import ProductListPage from '../pages/ProductListPage';
import NewProductPage from '../pages/NewProductPage.tsx'; // Necesitarás esta página para crear
import EditProductPage from '../pages/EditProductPage.tsx'; // Necesitarás esta página para editar
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Esto hace que ProductListPage sea la ruta principal de '/'
        element: <ProductListPage />,
      },
      {
        path: '/products/new', // Ruta para crear un nuevo producto
        element: <NewProductPage />,
      },
      {
        path: '/products/edit/:id', // ¡ESTA ES LA RUTA PARA EDITAR!
        element: <EditProductPage />,
      },
      // Puedes añadir más rutas aquí si es necesario
    ],
    errorElement: <NotFoundPage />, // Captura rutas no encontradas dentro del layout
  },
  {
    path: '*', // Ruta para cualquier otra cosa que no coincida (fuera del layout principal)
    element: <NotFoundPage />,
  }
]);