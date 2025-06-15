import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <Link to={`/usuarios/${usuario.id}`}>
              {usuario.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
