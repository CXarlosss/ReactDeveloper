// ✅ src/views/CreateProduct.tsx
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm.tsx";
import { createProduct } from "../services/ProductServices";
import { DraftProductSchema } from "../types/index.ts";
import { safeParse } from "valibot";

export default function CreateProduct() {
  const navigate = useNavigate();

  const handleSubmit = async (data: { name: string; price: number; availability: boolean }) => {
    const result = safeParse(DraftProductSchema, data);
    if (!result.success) {
      console.error(result.issues);
      return;
    }
    try {
      await createProduct(result.output);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-lg w-full transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-6 text-center tracking-tight">
          🆕 Crear Nuevo Producto
        </h2>
        {/* Aquí ya no pasamos las clases de estilo de los inputs/botones */}
        <ProductForm submitText="Crear Producto" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}