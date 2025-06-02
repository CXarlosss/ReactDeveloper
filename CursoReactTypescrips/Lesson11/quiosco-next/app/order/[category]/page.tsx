import { prisma } from "@/src/lib/prisma";
import ProductCard from "@/components/products/ProductCard";

// Obtener productos con categoría incluida
async function getProducts(categorySlug: string) {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
    },
    include: {
      category: {
        select: { name: true },
      },
    },
  });
}

// Generar rutas estáticas
export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export default async function OrderPage({ params }: { params: { category: string } }) {
  const products = await getProducts(params.category);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-black mb-4 text-center">
        Elige y personaliza tu pedido a continuación
      </h1>

      <h2 className="text-2xl font-semibold text-gray-700 mb-10 text-center">
        Categoría: {products[0]?.category.name ?? params.category}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
