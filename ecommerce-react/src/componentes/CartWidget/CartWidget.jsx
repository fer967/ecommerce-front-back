import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import './CartWidget.css';

const CartWidget = () => {
    const { cantidadTotal } = useContext(CarritoContext);
    return(
        <Link to='/cart' style={{display: cantidadTotal > 0? 'block':'none'}} >
            <button className='icono'>🛒{cantidadTotal}</button>
        </Link>
    );
}

export default CartWidget;
/*

*/

/*
import { useContext } from 'react';
import'./CartWidget.css';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartWidget(){
    const{totalCont} = useContext(CartContext);
    return(
        <Link to='/cart' style={{display: totalCont > 0? 'block':'none'}} >
            <button className='icono'>🛒{totalCont}</button>
        </Link>
    );
}
*/

/*
return (
        <div>
            <Link to="/cart">
                <img className="carrito" src="../img/carro.png" alt="Carrito" />
                {
                    cantidadTotal > 0 && <strong> {cantidadTotal} </strong>
                }
            </Link>
        </div>
    )
*/