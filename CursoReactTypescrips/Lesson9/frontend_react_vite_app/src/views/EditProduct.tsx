// ✅ src/views/EditProduct.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          name: data.name ,
          price: data.price,
          availability: data.availability,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setLoading(false);
      });
  }, [id]);



  const handleUpdate = (updatedData) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar el producto");
        navigate("/");
      })
      .catch((error) => console.error("Error al actualizar:", error));
  };

  if (loading) return <p className="text-center text-gray-600">Cargando producto...</p>;
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
