// src/views/CreateProduct.tsx
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm.tsx";

export default function CreateProduct() {
  const navigate = useNavigate();

  const handleSubmit = async (data: { name: string; price: number; availability: boolean }) => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al crear producto");

      navigate("/");
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
