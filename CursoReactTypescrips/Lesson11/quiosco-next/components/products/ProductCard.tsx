import { formatCurrency } from "@/src/utils";


type ProductCardProps = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <img
        src={`/products/${product.image}.jpg`}
        alt={`Imagen ${product.name}`}
        className="w-full aspect-square object-cover"
      />

      <div className="flex flex-col flex-1 p-5">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
          <p className="mt-3 font-black text-3xl text-indigo-600">
            {formatCurrency(product.price)}
          </p>
        </div>

        <button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-700 text-white w-full mt-6 py-3 rounded-lg uppercase font-bold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
