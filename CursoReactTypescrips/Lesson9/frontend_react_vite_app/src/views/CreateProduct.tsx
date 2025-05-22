// ✅ src/views/CreateProduct.tsx
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm.tsx";
// ⬇️ Importamos la función correcta desde el servicio
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
      // ✅ Versión correcta usando servicio:
      await createProduct(result.output);
      navigate("/");

      // ❌ Código anterior incorrecto:
      /*
      useEffect(() => {
        getAllProducts().then(setProducts).catch(console.error);
      }, []);
      */

      // ❌ Otra versión que hacía el fetch directo (también se puede usar, pero no reutilizable):
      /*
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al crear producto");
      */
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">🆕 Crear Producto</h2>
      <ProductForm submitText="Crear" onSubmit={handleSubmit} />
    </div>
  );
}
