import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";

const CartItem = ({ item, cantidad }) => {
    const { eliminarProducto } = useContext(CarritoContext);

    return (
        <div>
            <h4> {item.nombre} </h4>
            <p> Cantidad: {cantidad} </p>
            <p> Precio: {item.precio} </p>
            <button onClick={()=> eliminarProducto(item.id)}> Eliminar Producto </button>
            <hr />
        </div>
    )
}

export default CartItem;

/*
import './CartItem.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export default function CartItem() {
    const { cart, removeItem } = useContext(CartContext);

    return cart.map((product) => {
        return (
            <div key={product.id} className='item-cart'>
                <section>
                    <p>{product.title} </p>
                    <p>$ {product.price}</p>
                    <p>cantidad:{product.cont}</p>
                    <p>subtotal:$ {product.price * product.cont}</p>
                </section>
                <section>
                    <button onClick={() => removeItem(product.id)} className='delete'>eliminar</button>
                </section>
            </div>);
    });
}
 */