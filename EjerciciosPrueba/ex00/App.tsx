import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Inicio from "./Inicio";
import SobreMi from "./Sobre.Mi";
import Contacto from "./Contacto";
import UsuarioDetalle from "./UsuarioDetalle";
import FormularioContacto from "./FormularioContacto";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/sobre-mi">Sobre mí</Link> |{" "}
        <Link to="/contacto">Contacto</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/usuarios/:id" element={<UsuarioDetalle />} />
        <Route path="/formulario-contacto" element={<FormularioContacto />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
