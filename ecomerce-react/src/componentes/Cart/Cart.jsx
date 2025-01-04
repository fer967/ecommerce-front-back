import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);

    if (cantidadTotal === 0) {
        return (
            <>
                <h2>No hay productos en el carrito</h2>
                <Link to="/"> Ver Productos </Link>
            </>
        )
    }

    return (
        <div>
            {
                carrito.map(producto => <CartItem key={producto.item.id} {...producto} />)
            }
            <h3>Total: $ {total} </h3>
            <h3>Cantidad Total: {cantidadTotal} </h3>
            <button onClick={() => vaciarCarrito()}> Vaciar Carrito</button>
            <Link to="/checkout"> Finalizar Compra </Link>
        </div>
    )
}

export default Cart;

/*
import { useContext } from 'react';
import './Cart.css';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

export default function Cart() {
    const { cart, clearCart, totalCont, total } = useContext(CartContext);
    if (totalCont === 0) {
        return (
            <div className='cart-empty'>
                <h1>el carrito esta vacio</h1>
                <Link to='/' className='Option'>productos</Link>
            </div>
        )
    }
    return (
        <div className='cart'>
            <section className='cart-item'>
                {cart.map(p => <CartItem key={p.id} p={p} />)}
            </section>
            <h3>total: ${total}</h3>
            <section className='button'>
                <button onClick={() => clearCart()} className='Option' >limpiar carrito</button>
                <Link to='/checkout' className='Option'>checkout</Link>
            </section>
        </div>
    );
}
*/