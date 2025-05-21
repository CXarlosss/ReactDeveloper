import { createBrowserRouter } from "react-router-dom"
import Layout from  "../src/layouts/Layout"
import Products from "./views/Products"
import NuevoProducto from "./views/NuevoProducto"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            
            {
                index: true,
                path: "/products",
                element: <Products />
            },
            { 
                path: "/products/new",
                element: <NuevoProducto />
            }
        ]
    },
])

export default router