// ✅ src/views/EditProduct.tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm.tsx"; // Asegúrate de que este ProductForm ya tiene los estilos internos
import { getProductById, updateProduct } from "../services/ProductServices";
import { DraftProductSchema } from "../types/index.ts";
import { safeParse } from "valibot";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((data) => {
        // Asegúrate de que 'data' contenga 'name', 'price', 'availability'
        // y que sus tipos sean correctos para el formulario.
        setProduct({
          name: data.name,
          price: data.price,
          availability: data.availability,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener producto:", error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (updatedData) => {
    const result = safeParse(DraftProductSchema, updatedData);

    if (!result.success) {
      console.error(result.issues);
      return;
    }

    try {
      await updateProduct(id, result.output);
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  // Estilos para los mensajes de carga y error
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-blue-700 animate-pulse">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-lg w-full transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-6 text-center tracking-tight">
          ✏️ Editar Producto
        </h2>
        {/* Aquí pasamos el `product` como `defaultValues` */}
        <ProductForm
          defaultValues={product}
          onSubmit={handleUpdate}
          submitText="Guardar Cambios"
        />
      </div>
    </div>
  );
}