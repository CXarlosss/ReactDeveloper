// Importa los iconos `FingerPrintIcon` y `UserIcon` de Heroicons. Estos son componentes SVG.
import { FingerPrintIcon, UserIcon } from "@heroicons/react/20/solid";
// Importa `Link`, `useLocation` y `useNavigate` de 'react-router-dom' para la navegación y la obtención de la ubicación actual.
import { Link, useLocation, useNavigate } from "react-router-dom";

// Define un array de objetos que representan las pestañas de navegación.
// Cada objeto tiene un `name` (nombre a mostrar), `href` (la ruta a la que enlaza) y un `icon` (el componente de icono).
const tabs = [
  { name: "Mi Cuenta", href: "/profile", icon: UserIcon }, // Pestaña para la información de la cuenta.
  {
    name: "Cambiar Password",
    href: "/profile/password",
    icon: FingerPrintIcon,
  }, // Pestaña para cambiar la contraseña.
];

// Función de utilidad para combinar clases CSS condicionalmente.
// Filtra cualquier valor falsy (como cadenas vacías o `false`) y une las clases restantes con un espacio.
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Define el componente funcional `Tabs`.
export default function Tabs() {
  // Inicializa el hook `useNavigate` para la navegación programática.
  const navigate = useNavigate(); // Inicializa el hook `useLocation` para obtener la información de la URL actual.
  const location = useLocation(); // Determina la pestaña actual filtrando el array `tabs` para encontrar la pestaña cuyo `href` coincide con la ruta actual. // Se asume que siempre habrá una pestaña que coincida, por lo que se accede directamente a la primera (`[0].href`).
const currentTab = tabs.find((tab) => tab.href === location.pathname)?.href || tabs[0].href;

  return (
    <div className="mb-10">
 
      {/* Sección para dispositivos móviles (se muestra solo en pantallas pequeñas) */}

      <div className="sm:hidden">
   
        {/* Etiqueta de accesibilidad para el elemento select */}
        <label htmlFor="tabs" className="sr-only">
      
        </label>
 {/* Dropdown (select) para la navegación en móviles */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-purple-800 focus:ring-purple-800" // Al cambiar la selección, navega a la ruta correspondiente.
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            navigate(e.target.value)
          }
          value={currentTab} // Establece el valor seleccionado del dropdown a la pestaña actual.
        >
    
          {/* Mapea el array `tabs` para crear las opciones del dropdown */}
    
          {tabs.map((tab) => {
            return (
              <option
                value={tab.href} // El valor de la opción es la ruta de la pestaña.
                key={tab.name}
              >
                {tab.name}
              </option> // El texto de la opción es el nombre de la pestaña.
            );
          })}

        </select>

      </div>

      {/* Sección para pantallas grandes (se oculta en pantallas pequeñas) */}
 
      <div className="hidden sm:block">
     
        <div className="border-b border-gray-200">
       {/* Barra de navegación de pestañas */}
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        
            {/* Mapea el array `tabs` para crear cada enlace de pestaña */}
            {tabs.map((tab) => (
              <Link
                key={tab.name} // Clave única para cada elemento de la lista.
                to={tab.href} // La ruta a la que enlaza el Link.
                className={classNames(
                  // Aplica clases condicionalmente basadas en si la pestaña actual coincide con la ruta.
                  location.pathname === tab.href
                    ? "border-purple-800 text-purple-800" // Clases para la pestaña activa.
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700", // Clases para pestañas inactivas.
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium" // Clases base para todas las pestañas.
                )}
              >
             
                {/* Renderiza el icono de la pestaña */}
        
                <tab.icon
                  className={classNames(
                    // Aplica clases condicionalmente al icono para cambiar su color.
                    location.pathname === tab.href
                      ? "text-purple-800"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5" // Clases de tamaño y margen para el icono.
                  )}
                  aria-hidden="true" // Indica que el icono es decorativo para los lectores de pantalla.
                />
              <span>{tab.name}</span>
                {/* Muestra el nombre de la pestaña. */}
        
              </Link>
            ))}    </nav>     </div>
          </div>
   
    </div>
  );
}
