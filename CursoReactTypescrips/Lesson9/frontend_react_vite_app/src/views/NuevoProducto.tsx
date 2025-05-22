// ✅ src/views/NuevoProducto.tsx
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm.tsx"; // Asegúrate de que ProductForm ya tiene sus estilos internos

export default function NuevoProducto() {
  const navigate = useNavigate();

  const handleSubmit = async (data: { name: string; price: number; availability: boolean }) => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Mejor manejo de errores:
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear producto");
      }

      navigate("/"); // vuelve al listado
    } catch (error) {
      console.error(error);
      // Aquí podrías añadir una notificación al usuario, por ejemplo:
      // alert(`Error al crear producto: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-lg w-full transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-6 text-center tracking-tight">
          🆕 Crear Nuevo Producto
        </h2>
        {/* ProductForm ya contiene sus propios estilos de inputs, labels, y botón */}
        <ProductForm submitText="Crear Producto" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}