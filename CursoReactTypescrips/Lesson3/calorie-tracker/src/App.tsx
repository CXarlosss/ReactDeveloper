import Form from "./components/Form";

export default function App() {
  return (
    <>
      {/* Encabezado */}
      <header className="bg-lime-600 py-4 shadow">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white uppercase">
            Calorie Tracker
          </h1>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="bg-gray-100 min-h-screen py-10 px-4">
        <section className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-6 text-gray-700 text-center">
            Registrar actividad o comida
          </h2>
          <Form />
        </section>
      </main>
    </>
  );
}
