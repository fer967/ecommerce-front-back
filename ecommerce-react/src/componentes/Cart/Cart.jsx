import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);
    if (cantidadTotal === 0) {
        return (
            <div className="carrito-vacio">
                <h2>No hay productos en el carrito</h2>
                <Link to="/"> Volver a Inicio </Link>
            </div>
        )
    }
    return (
        <div className="cart">
            {
                carrito.map(producto => <CartItem key={producto.item._id} {...producto} />)
            }
            <h3>total items: {cantidadTotal} </h3>
            <h3>total compra: $ {total} </h3>
            <br />
            <button onClick={() => vaciarCarrito()} className="vaciar"> Vaciar Carrito</button>
            <br />
            <Link to="/register" className="comprar"> Finalizar Compra </Link>
        </div>
    )
}

export default Cart;
