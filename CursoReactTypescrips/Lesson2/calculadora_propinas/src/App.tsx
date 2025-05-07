import { menuItems } from "./data/db";
import MenuItem from "./components/MenuItem";
import { useOrderContext } from "./context/OrderContext"; // 👈

function App() {
  const { addItem, order } = useOrderContext(); // ✅ Acceso global

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">
          Calculadora de Propinas y Consumos
        </h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid grid-cols-2 p-5 gap-5 border border-dashed border-slate-300 p-5 rounder-lg space-y-10">
        {/* Menú */}
        <div className="p-5 bg-white shadow rounded">
          <h2 className="font-black text-4xl">Menú</h2>
          <div className="mt-10 space-y-3">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} addItem={addItem} />
            ))}
          </div>
        </div>

        {/* Consumo */}
        <div className="border border-dashed border-slate-300 p-5 rounder-lg space-y-10">
          <h2 className="font-black text-4xl mb-5">Consumo</h2>

          {order.length === 0 ? (
            <p className="text-gray-500">Aún no hay productos en la orden.</p>
          ) : (
            <ul className="space-y-3">
              {order.map((item) => (
                <li
                  key={item.id}
                  className="border p-3 rounded shadow flex justify-between items-center"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
