import { useState } from "react";

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
            <div>
                <button onClick={restarContador} className="btn"> - </button>
                <p> {contador} </p>
                <button onClick={sumarContador} className="btn"> + </button>
            </div>
            <button className="btn" onClick={() => funcionAgregar(contador)}> Agregar al Carrito </button>
        </>
    )
}

export default Contador;

/*
import './ItemCount.css';
import { useState} from 'react';

export default function ItemCount({ stock, initial, onAdd }) {

    const [cont, setCont] = useState(initial);
    const handleInc = () => {
        if (cont < stock) {
            setCont(cont + 1);
        }
    }
    const handleDec = () => {
        if (cont > 1) {
            setCont(cont - 1);
        }
    }
    return (
        <div className="container-count">
            <div className="controls">
                <button className="button" onClick={handleDec}>-</button>
                <p>{cont}</p>
                <button className="button" onClick={handleInc}>+</button>
            </div>
            <div>
                <button className="Option" onClick={() => onAdd(cont)} disabled={!stock}>agregar al carrito</button>
            </div>
        </div>
    );
}
 */