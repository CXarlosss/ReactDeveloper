import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UsuarioDetalle() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUsuario(data));
  }, [id]);

  if (!usuario) return <p>Cargando usuario...</p>;

  return (
    <div>
      <h2>{usuario.name}</h2>
      <p>Email: {usuario.email}</p>
      <p>Teléfono: {usuario.phone}</p>
      <p>Ciudad: {usuario.address.city}</p>
      <p>Compañía: {usuario.company.name}</p>
    </div>
  );
}

export default UsuarioDetalle;
