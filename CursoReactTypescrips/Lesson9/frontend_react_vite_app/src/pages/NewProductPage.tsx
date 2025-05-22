// src/pages/NewProductPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts'; // Importa tu hook
import type { ProductFormData } from '../types/product.d';

// Importa tus componentes Button e Input
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

function NewProductPage() {
  const navigate = useNavigate(); // Hook para la navegación programática
  const { addProduct, loading, error } = useProducts(); // Usamos la función addProduct del hook

  // Inicializa el formulario con valores por defecto para un nuevo producto
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    availability: true, // Por defecto, un nuevo producto está disponible
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Asegúrate de que el precio se envía como número
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price.toString()), // Convertir a número antes de enviar
      };
      await addProduct(dataToSend);
      alert('Producto creado correctamente!');
      navigate('/'); // Redirige a la lista de productos después de guardar
    } catch (err) {
      alert(`Error al crear producto: ${error || 'Desconocido'}`);
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl max-w-md mt-10">
      <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center">
        Crear Nuevo Producto
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
            step="0.01" // Permite decimales
            required
          />
        </div>

        <div className="flex items-center">
          <Input // Usamos el componente Input para checkbox
            type="checkbox"
            id="availability"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" // Clases adicionales
          />
          <label htmlFor="availability" className="text-gray-700 text-sm font-bold">
            Disponible
          </label>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link to="/">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </Link>
          <Button // Usamos el componente Button
            type="submit"
            variant="primary" // Usamos la variante 'primary'
            disabled={loading} // Deshabilita el botón mientras carga
          >
            {loading ? 'Creando...' : 'Crear Producto'}
          </Button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
}

export default NewProductPage;