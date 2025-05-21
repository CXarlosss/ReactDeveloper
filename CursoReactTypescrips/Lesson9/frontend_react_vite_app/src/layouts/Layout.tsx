import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <>
    <header className="bg-slate-600">
      <div>
        <h1 className="text-4xl font-extrabold text-white">CHORLYSOCIAL</h1>
      </div>
    </header>
      <h1>Layout</h1>
      <Outlet />
    </>
  )
}

export default Layout
