import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import "./CartItem.css";

const CartItem = ({ item, cantidad }) => {
    const { eliminarProducto } = useContext(CarritoContext);
    // Dentro de tu componente donde llamas a eliminarProducto:
    const handleRemove = (itemId) => {
    console.log("Eliminando item con ID:", itemId);  // OK
    eliminarProducto(itemId);
};
    return (
        <div className="cartItem">
            <h3> {item.nombre} </h3>
            <p> Cantidad: {cantidad} </p>
            <p> Precio: $ {item.precio} </p>
            <button onClick={() => handleRemove(item._id)} className="eliminar"> Eliminar Producto </button>
            <br />
        </div>
    )
}

export default CartItem;





