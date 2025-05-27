import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-green-700">Página No Encontrada</h1>
      <p className="mt-10 text-center text-green-700">
        Tal vez quieras volver a{' '}
        <Link className="text-green-500 underline hover:text-green-600 transition" to={'/'}>
          Proyectos
        </Link>
      </p>
    </>
  );
}
