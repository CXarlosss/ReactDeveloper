import { useState, useEffect } from 'react';

export default function Mensaje() {
const [contador, setContador] = useState(0);
  useEffect(() => {
    console.log("El componente se montó ");
  }, [contador]);

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}

