import { useMemo, useState } from "react"
import { NavLink, useLocation} from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: '',
  });

  const categories = useAppStore((state) => state.categories)
  const searchRecipes = useAppStore((state) => state.searchRecipes)
  const showNotification = useAppStore(state => state.showNotification)
  
  const location = useLocation()
  const isHome = useMemo(() => location.pathname === '/', [location.pathname])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e:  React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    if(Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    
    // Consultar las recetas
    searchRecipes(searchFilters)
  }

  
  return (
    <header
      className={isHome ? 'bg-header bg-cover bg-center' : 'bg-slate-800'}
    >
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                  <img className="w-32" src="/logo.svg"  alt="logotipo" />

                </div>
                <nav className="flex gap-4 text-white ">
                  <NavLink
                    to={'/'}
                    className={({ isActive }) =>
                      isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold" 
                    }
                  >
                      Inicio
                  </NavLink>
                  <NavLink
                    to={'/favorites'}
                    className={({ isActive }) =>
                      `text-${isActive ? 'orange-500' : 'white'} uppercase font-bold`
                    }
                  >
                      Favoritos
                  </NavLink>

                  <NavLink
                    to={'/generate'}
                    className={({ isActive }) =>
                      `text-${isActive ? 'orange-500' : 'white'} uppercase font-bold`
                    }
                  >
                      Generar con IA
                  </NavLink>
                </nav>
            </div>

            {isHome && (  
              <>          
                <form
                    className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-4">
                        <label
                            className="block text-white uppercase font-extrabold text-lg"
                            htmlFor="ingredient">Nombre o Ingredientes</label>
                        <input 
                            id="ingredient"
                            type="text"
                            name="ingredient"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-4">
                        <label
                            className="block text-white uppercase font-extrabold text-lg"
                            htmlFor="category">Categoría</label>
                        <select 
                            id="category"
                            name="category"
                            className="p-3 w-full rounded-lg focus:outline-none bg-white"
                            onChange={handleChange}
                        >
                            <option value="">-- Seleccione -- </option>
                            {categories.drinks.map(category => (
                                <option 
                                    key={category.strCategory} 
                                    value={category.strCategory}
                                >{category.strCategory}</option>
                            ))}
                        </select>
                    </div>
                        
                    <input
                        type="submit"
                        className="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        value="Buscar Recetas"
                    />
                </form>
              </>  
            )}
        </div>
    </header>
  )
}
