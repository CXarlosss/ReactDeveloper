// src/pages/ProductFormPage.tsx (este será el esqueleto inicial)
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductSchema } from '../schemas/productSchema'; // Importamos el esquema de Valibot
import { parse, ValiError } from 'valibot'; // Para parsear y manejar errores de Valibot
import type { ProductFormData } from '../types/product.d';

function ProductFormPage() {
  const { id } = useParams<{ id?: string }>(); // 'id' será opcional para crear
  const navigate = useNavigate();
  const { products, addProduct, modifyProduct } = useProducts(); // Usamos los hooks de CRUD

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    availability: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({}); // Para errores de validación
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true); // Para cargar un producto existente

  useEffect(() => {
    if (id) {
      // Si hay un ID en la URL, estamos editando
      const productToEdit = products.find(p => p.id === id);
      if (productToEdit) {
        setFormData({
          name: productToEdit.name,
          price: productToEdit.price,
          availability: productToEdit.availability,
        });
        setLoadingProduct(false);
      } else {
        // Producto no encontrado, podrías redirigir a 404 o lista
        navigate('/products');
      }
    } else {
      setLoadingProduct(false); // Si no hay ID, es un formulario nuevo
    }
  }, [id, products, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Limpiar error al cambiar el campo
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); // Limpiar errores previos

    try {
      // Validar con Valibot
      const validatedData = parse(ProductSchema, {
        ...formData,
        price: Number(formData.price), // Asegurarse de que el precio sea número para Valibot
      });

      if (id) {
        // Editar producto
        await modifyProduct(id, validatedData);
        alert('Producto actualizado con éxito!');
      } else {
        // Crear nuevo producto
        await addProduct(validatedData);
        alert('Producto creado con éxito!');
      }
      navigate('/products'); // Redirigir a la lista
    } catch (err) {
      if (err instanceof ValiError) {
        // Errores de validación de Valibot
        const newErrors: Record<string, string> = {};
        err.issues.forEach(issue => {
          if (issue.path && issue.path[0] && issue.path[0].key) {
            newErrors[issue.path[0].key as string] = issue.message;
          }
        });
        setErrors(newErrors);
        console.error('Errores de validación:', newErrors);
      } else {
        // Otros errores de la API
        alert(`Error al guardar el producto: ${(err as Error).message}`);
        console.error('Error al guardar producto:', err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingProduct) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Cargando formulario...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {id ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? 'border-red-500' : ''}`}
          />
          {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="availability"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <label htmlFor="availability" className="text-gray-700 text-sm font-bold">Disponible</label>
          {errors.availability && <p className="text-red-500 text-xs italic ml-4">{errors.availability}</p>}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : (id ? 'Actualizar Producto' : 'Crear Producto')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductFormPage;