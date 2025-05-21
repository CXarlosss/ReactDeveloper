import { createBrowserRouter } from "react-router-dom"
import Layout from  "../src/layouts/Layout"
import Products from "./views/Products"
import NuevoProducto from "./views/NuevoProducto"
import EditProduct from "./views/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Esto ya apunta a "/"
        element: <Products />
      },
      {
        path: "products/new",
        element: <NuevoProducto />
      },
      {
        path: "products/:id/edit",
        element: <EditProduct />
      }

    ]
  }
]);
