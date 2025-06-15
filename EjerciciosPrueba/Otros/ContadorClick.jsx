import { useState } from "react";

function Componente ( ) {

     const [estado, setEstado]= useState(0);

     const incrementar = ( )=> {
        setEstado(estado +1);
     }
     const decrementear = () => {
        setEstado(estado -1);
     }

    return (
        <div>
            <h1>{estado}</h1>
            <button onClick={incrementar}>Incrementar</button>
            <button onClick={decrementear} disabled={estado === 0}>Decrementar</button>
        </div>
    )
    }