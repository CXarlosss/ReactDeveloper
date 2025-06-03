import { Product } from "@prisma/client";
import { formatCurrency } from "@/src/utils";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
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

        <AddProductButton product={product} />
      </div>
    </div>
  );
}
