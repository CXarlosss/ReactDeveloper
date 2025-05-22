import { createBrowserRouter } from "react-router-dom";
import Layout from "../src/layouts/Layout";
import Products from "./views/Products";
import EditProduct from "./views/EditProduct";
import ErrorMessage from "./components/ErrorMessage";
import CreateProduct from "./views/CreateProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorMessage />, // 👈 También puedes ponerlo aquí si quieres algo específico

    children: [
      {
        index: true, // Esto ya apunta a "/"
        element: <Products />,
        errorElement: <ErrorMessage />,
      },
      {
        path: "products/new",
        element: <CreateProduct />,
      },
      {
        path: "products/:id/edit",
        element: <EditProduct />,
      },
    ],
  },
]);
