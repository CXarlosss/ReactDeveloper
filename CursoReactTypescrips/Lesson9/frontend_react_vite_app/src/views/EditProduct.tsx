// ✅ src/views/EditProduct.tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm.tsx";
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

  if (loading) return <p className="text-center">Cargando producto...</p>;
  if (!product) return <p className="text-center text-red-600">Producto no encontrado.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        ✏️ Editar Producto
      </h2>
      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        submitText="Guardar Cambios"
      />
    </div>
  );
}
