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


