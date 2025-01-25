import { useState } from "react";
import './Contador.css';

const Contador = ({ inicial, stock, funcionAgregar }) => {
    const [contador, setContador] = useState(inicial);

    const sumarContador = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    }
    const restarContador = () => {
        if (contador > inicial) {
            setContador(contador - 1);
        }
    }
    return (
        <>
            <div className="contenedorContador">
                <div className="contador">
                    <button onClick={restarContador} className="btn"> - </button>
                    <p> {contador} </p>
                    <button onClick={sumarContador} className="btn"> + </button>
                </div>
                <button className="btn" onClick={() => funcionAgregar(contador)}> Agregar al Carrito </button>
            </div>
        </>
    )
}

export default Contador;

