import { useAuth } from "./context/AuthContext"
import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipPercentageForm from "./components/TipPercentageForm"
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"
import LoginForm from "./components/LoginForm"
import { useState } from "react"
import OrderHistory from "./components/OrderHistory"

function App() {
  const { order, tip, setTip, addItem, removeItem, placeOrder, history } = useOrder()
  const { username, logout } = useAuth()
  const [showHistory, setShowHistory] = useState(false)

  if (!username) return <LoginForm />

  return (
    <>
      <header className="bg-teal-400 py-5 flex justify-between items-center px-10 gap-10">
        <h1 className="text-2xl md:text-4xl font-black text-black tracking-tight ">Calculadora de Propinas y Consumo</h1>
        <div className="text-white text-right">
          <p className="font-semibold font-black text-black">👤 {username}</p>
          <button className="text-sm underline font-black text-black block mb-1" onClick={logout}>Cerrar sesión</button>
          <button
            className="text-sm underline font-black text-black"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "Ocultar historial" : "Ver historial"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="font-black text-4xl">Menú</h2>

          <div className="mt-10 space-y-3">
            {menuItems.map(item => (
              <MenuItem 
                key={item.id}
                item={item}
                addItem={addItem}
              />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {showHistory ? (
            <OrderHistory history={history} />
          ) : order.length ? (
            <>
              <OrderContents
                order={order}
                removeItem={removeItem}
              />
              <TipPercentageForm 
                setTip={setTip}
                tip={tip}
              />
              <OrderTotals 
                order={order}
                tip={tip}
                placeOrder={placeOrder}
              />
            </>
          ) : (
            <p className="text-center">La orden está vacía</p>
          )}
        </div>
      </main>
    </>
  )
}

export default App
