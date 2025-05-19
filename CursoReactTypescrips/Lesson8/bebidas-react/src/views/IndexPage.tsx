import { useEffect, useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"
import type{ Drink } from "../types"

export default function IndexPage() {
  const fetchCategories   = useAppStore((state) => state.fetchCategories)
  const drinks = useAppStore((state) => state.drinks)
console.log('Drinks en IndexPage:', drinks);

  useEffect(() => {
    fetchCategories()
  }, [])

  const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks])
  return (
    <>
        <h1 className="text-6xl font-extrabold">Recetas</h1>

        {hasDrinks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10 ">
              {drinks.drinks.map((recipe : Drink) => (
                <DrinkCard
                  key={recipe.idDrink}
                  recipe={recipe}
                />
              ))}
          </div>
        ) : (
          <p className="my-10 text-center text-2xl">
            No hay Resultados, utiliza el formulario para buscar recetas
          </p>
        )}
    </>
  )
}
