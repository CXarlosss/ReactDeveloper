function TarjetaUsuario({ nombre, edad, ciudad }) {
    return (
        <div>
            <h2>{nombre}</h2>
            <p>Edad: {edad}</p>
            <p>Ciudad: {ciudad}</p>
        </div>
    );

}
const usuarios = [
  { nombre: "Sara", edad: 29, ciudad: "Bilbao" },
  { nombre: "Juan", edad: 35, ciudad: "Sevilla" },
  { nombre: "Nerea", edad: 24, ciudad: "Barcelona" },
];

function App() {
  return (
    <div>
      {usuarios.map((usuario, index) => (
        <TarjetaUsuario
          key={index}
          nombre={usuario.nombre}
          edad={usuario.edad}
          ciudad={usuario.ciudad}
        />
      ))}
    </div>
  );
}

export default App;