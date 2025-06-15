import { useEffect, useState } from "react";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setUsuarios(datos);
                setCargando(false);
            })
            .catch((error) => {
                console.error("Error al cargar los usuarios:", error);
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p>Cargando usuarios...</p>;
    }

    return (
        <div>
            <h2>Lista de usuarios</h2>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.name} – {usuario.email}
                    </li>
                ))}
            </ul>
        </div>

    )}