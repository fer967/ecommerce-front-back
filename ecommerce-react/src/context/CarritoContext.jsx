import { useState, createContext } from "react";

export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTotal: 0
})

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);

    const agregarAlCarrito = (item, cantidad) => {
        const productoExistente = carrito.find(prod => prod.item._id === item._id); 
        if(!productoExistente) {
            setCarrito(prev => [...prev, {item, cantidad}]);
            setCantidadTotal(prev => prev + cantidad);
            setTotal( prev => prev + (item.precio * cantidad)); 
            
        } else {
            const carritoActualizado = carrito.map( prod => {
                if(prod.item._id === item._id) {
                    return {...prod, cantidad: prod.cantidad + cantidad};
                }else {
                    return prod; 
                }
            })
            setCarrito(carritoActualizado);
            setCantidadTotal(prev => prev + cantidad);
            setTotal( prev => prev + (item.precio * cantidad)); 
        }
    }
    

    const eliminarProducto = (id) => {
        const productoEliminado = carrito.find(prod => prod.item.id === id);
        const carritoActualizado = carrito.filter(prod => prod.item.id !== id);
        setCarrito(carritoActualizado);
        setCantidadTotal(prev => prev - productoEliminado.cantidad);
        setTotal(prev => prev - (productoEliminado.item.precio * productoEliminado.cantidad));
    }

    const vaciarCarrito = () => {
        setCarrito([]);
        setCantidadTotal(0);
        setTotal(0);
    }
    return (
        <CarritoContext.Provider value={{ carrito, total, cantidadTotal, agregarAlCarrito, eliminarProducto, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    )
}


/*
import { createContext, useState,useEffect } from 'react';
export const CartContext = createContext({cart:[]});

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    console.log(cart)
    
    const addItem = (item, cont)=>{
        if(!isInCart(item.id)){

            // modificacion
            setCart([...cart,{...item,cont}]);

        } else{
            console.error('el producto ya fue agregado');
        }
    }

    const removeItem = (itemId)=>{
        const cartUpdated = cart.filter(prod => prod.id !== itemId)
        setCart(cartUpdated)
    }

    const clearCart = ()=>{
        setCart([])
    }

    const isInCart = (itemId)=>{
        return cart.some(prod => prod.id === itemId)
    }

    const total =  cart.reduce((acc,el) => acc + el.price * el.cont, 0);

    const totalCont = cart.reduce((acc,el) => acc + el.cont, 0);

    return (
        <CartContext.Provider value={{cart,addItem,removeItem,clearCart,total,totalCont}}>
            {children}
        </CartContext.Provider>
    );
}
*/






