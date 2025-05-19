import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { JSX } from 'react';
import { useAppStore } from '../stores/useAppStore';
import type { ActiveRecipe } from '../types';
type IngredientKey = `strIngredient${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15}`;
type MeasureKey = `strMeasure${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15}`;

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const closeModal = useAppStore((state) => state.closeModal);
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite);
  const favoriteExists = useAppStore((state) => state.favoriteExists);

  if (!selectedRecipe) return null;

  const renderIngredients = () => {
  const ingredients: JSX.Element[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as IngredientKey;
    const measureKey = `strMeasure${i}` as MeasureKey;

    const ingredient = selectedRecipe[ingredientKey];
    const measure = selectedRecipe[measureKey];

    if (ingredient && measure) {
      ingredients.push(
        <li key={i} className="text-lg font-normal">
          {ingredient} - {measure}
        </li>
      );
    }
  }

  return ingredients;
};


  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                  {selectedRecipe.strDrink}
                </Dialog.Title>
                <img
                  src={selectedRecipe.strDrinkThumb}
                  alt={`Imagen de ${selectedRecipe.strDrink}`}
                  className="mx-auto w-96"
                />
                <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                  Ingredientes y Cantidades
                </Dialog.Title>

                {renderIngredients()}
                <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                  Instrucciones
                </Dialog.Title>

                <p className="text-l">{selectedRecipe.strInstructions}</p>

                <div className="mt-5 sm:mt-6 flex justify-between gap-4">
                  <button
                    type="button"
                    className="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500"
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>

                  <button
                    type="button"
                    className="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500"
                    onClick={() => handleClickFavorite(selectedRecipe)}
                  >
                    {favoriteExists(selectedRecipe.idDrink)
                      ? 'Eliminar Favorito'
                      : 'Agregar a Favoritos'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
