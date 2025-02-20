import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import "./CartItem.css";

const CartItem = ({ item, cantidad }) => {
    const { eliminarProducto } = useContext(CarritoContext);
    return (
        <div className="cartItem">
            <h2> {item.nombre} </h2>
            <p> Cantidad: {cantidad} </p>
            <p> Precio: $ {item.precio} </p>
            <button onClick={()=> eliminarProducto(item.id)} className="eliminar"> Eliminar Producto </button>
            <br />
        </div>
    )
}

export default CartItem;


