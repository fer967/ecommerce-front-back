// nuevo context :
/*
import { useState, createContext } from "react";

export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTotal: 0
});

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);

    const agregarAlCarrito = (item, cantidad) => {
        const productoExistente = carrito.find(prod => prod.item._id === item._id);

        if (!productoExistente) {
            setCarrito(prev => [...prev, { item, cantidad }]);
            setCantidadTotal(prev => prev + cantidad);
            setTotal(prev => prev + (item.precio * cantidad));
        } else {
            setCarrito(prevCarrito => { // Usa la función de actualización
                return prevCarrito.map(prod => {
                    if (prod.item._id === item._id) {
                        return { ...prod, cantidad: prod.cantidad + cantidad };
                    } else {
                        return prod;
                    }
                });
            });
            setCantidadTotal(prev => prev + cantidad);
            setTotal(prev => prev + (item.precio * cantidad));
        }
    };

    const eliminarProducto = (id) => {
        const productoEliminado = carrito.find(prod => prod.item._id === id);
        setCarrito(prevCarrito => { // Usa la función de actualización y crea un nuevo array
            return prevCarrito.filter(prod => prod.item._id !== id);
        });
        if (productoEliminado) {
            setCantidadTotal(prev => prev - productoEliminado.cantidad);
            setTotal(prev => prev - (productoEliminado.item.precio * productoEliminado.cantidad));
            console.log(total, cantidadTotal);  // no actualiza
        } else {
            console.warn(`Producto con ID ${id} no encontrado en el carrito al intentar eliminar.`);
        }
    };
    const vaciarCarrito = () => {
        setCarrito([]);
        setCantidadTotal(0);
        setTotal(0);
    };

    return (
        <CarritoContext.Provider value={{ carrito, total, cantidadTotal, agregarAlCarrito, eliminarProducto, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};*/



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
        const productoExistente = carrito.find(prod => prod.item._id === item._id); // Usando _id
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
        const productoEliminado = carrito.find(prod => prod.item._id === id); // Usando _id
        console.log(productoEliminado);  // OK
        const carritoActualizado = carrito.filter(prod => prod.item._id !== id); // Usando _id
        setCarrito(carritoActualizado);
        console.log(carritoActualizado);
        // Verifica si se encontró el producto antes de actualizar los totales
        if (productoEliminado) {
            setCantidadTotal(prev => {
                const nuevaCantidadTotal = prev - productoEliminado.cantidad;
                console.log("Nueva cantidad total:", nuevaCantidadTotal);           // OK
                return nuevaCantidadTotal;
            });
            setTotal(prev => {
                const nuevoTotal = prev - (productoEliminado.item.precio * productoEliminado.cantidad);
                console.log("Nuevo total:", nuevoTotal);          // OK
                return nuevoTotal;
            });
        } else {
            console.warn(`Producto con ID ${id} no encontrado en el carrito al intentar eliminar.`);
        }
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















