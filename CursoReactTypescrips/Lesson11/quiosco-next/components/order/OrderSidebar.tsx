import { getCategories } from "@/src/lib/queries"
import CategoryIcon from "../ui/CategoryIcon"
import Logo from "../ui/Logo"

export default async function OrderSidebar() {
  const categories = await getCategories()

  return (
    <aside className="md:w-72 md:h-screen bg-white p-4">
      <Logo/>
      <h2 className="text-xl font-bold mb-4">Categorías</h2>
      <nav className="mt-10">
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              <CategoryIcon category={category} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
