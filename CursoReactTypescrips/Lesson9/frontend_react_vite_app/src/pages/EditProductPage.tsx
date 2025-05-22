// src/pages/EditProductPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import type { ProductFormData } from '../types/product.d';

// Importa tus componentes Button e Input
import Button from '../components//ui/Button';
import Input from '../components/ui/Input';

function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, updateProduct, loading, error } = useProducts();

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    availability: true,
  });
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const product = await getProduct(id);
        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            availability: product.availability,
          });
        } else {
          navigate('/products/not-found');
        }
      }
      setInitialLoadComplete(true);
    };

    fetchProduct();
  }, [id, getProduct, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      alert('ID de producto no encontrado.');
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        // Asegúrate de que el precio se envía como número.
        // `value` de un input tipo 'number' es un string, por eso el parseFloat.
        price: parseFloat(formData.price.toString()), 
      };
      await updateProduct(id, dataToSend);
      alert('Producto actualizado correctamente!');
      navigate('/');
    } catch (err) {
      alert(`Error al actualizar producto: ${error || 'Desconocido'}`);
      console.error('Submit error:', err);
    }
  };

  if (!initialLoadComplete) {
    return <p className="text-center text-xl text-blue-600 mt-10">Cargando producto...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-600 mt-10">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl max-w-md mt-10">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">
        Editar Producto ID: {id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Producto:
          </label>
          <Input // Usamos el componente Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Precio:
          </label>
          <Input // Usamos el componente Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="flex items-center">
          <Input // Usamos el componente Input (para checkbox también)
            type="checkbox"
            id="availability"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" // Clases adicionales para checkbox
          />
          <label htmlFor="availability" className="text-gray-700 text-sm font-bold">
            Disponible
          </label>
        </div>

        <div className="flex justify-between items-center mt-6">
          {/* Para el botón Cancelar, envolvemos Link con Button */}
          <Link to="/">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </Link>
          <Button // Usamos el componente Button
            type="submit"
            variant="primary" // Usamos la variante 'primary' que definimos
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProductPage;