// ✅ src/components/ProductForm.tsx
import { useState } from "react";

export default function ProductForm({
  initialData = { name: "", price: "", availability: true },
  onSubmit,
  submitText,
}: {
  initialData?: { name: string; price: string | number; availability: boolean };
  onSubmit: (data: { name: string; price: number; availability: boolean }) => void;
  submitText: string;
}) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(String(formData.price)),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded shadow-md"
    >
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Precio:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="availability"
          checked={formData.availability}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">Disponible</label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}
