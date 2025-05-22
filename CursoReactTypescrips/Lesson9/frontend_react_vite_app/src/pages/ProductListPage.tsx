// src/pages/ProductListPage.tsx
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
// Ya no necesitamos 'Link' aquí si el botón de añadir se va a la Navbar
// import { Link } from 'react-router-dom'; 

function ProductListPage() {
  const { products, loading, error, removeProduct } = useProducts();

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await removeProduct(id);
        alert('Producto eliminado correctamente.');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert('Error al eliminar el producto.');
      }
    }
  };

  if (loading) {
    return <p className="text-center text-xl text-blue-600 mt-10">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-600 mt-10">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* ELIMINADO: El encabezado H1 que decía "Productos" o similar 
        y el botón de "Añadir Nuevo Producto".
        La Navbar ahora maneja esta navegación y el título implícito de la página.
      */}

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-xl mt-10">No hay productos disponibles.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductListPage;