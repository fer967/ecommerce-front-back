// modificacion 3 :

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/config';
import './OrderDetail.css';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const checkoutInitialized = useRef(false);
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

    console.log("OrderDetail: id from useParams:", id);   // ok

    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true);
            setError(null);
            try {
                const orderResponse = await api.get(`/ordenes/${id}`);
                console.log("API Response:", orderResponse.data);
                // Verifica si orderResponse.data es un array y extrae el objeto
                const orderData = Array.isArray(orderResponse.data) ? orderResponse.data[0] : orderResponse.data;
                setOrder(orderData);
                console.log("Order state after setting:", orderData);     // <-- Log AFTER setting the state
                const productIds = orderData.items.map(item => item.producto);
                const productPromises = productIds.map(async productId => {
                    const productResponse = await api.get(`/productos/${productId}`);
                    console.log("Product API Response:", productResponse.data);
                    return productResponse.data;
                });
                const productResponses = await Promise.all(productPromises);
                setProducts(productResponses);
            } catch (err) {
                console.error('Error al obtener los detalles de la orden:', err);
                setError('Error al cargar los detalles de la orden.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [id]);

    useEffect(() => {
        if (loading) return; // No hacer nada mientras se está cargando
        const walletContainer = document.getElementById('wallet_container');
        if (order && order.preferenceId && walletContainer && !checkoutInitialized.current && PUBLIC_KEY) {
            console.log("Initializing MercadoPago checkout");
            walletContainer.innerHTML = '';
            try {
                const mp = new window.MercadoPago(PUBLIC_KEY, {
                    locale: 'es-AR'
                });
                mp.checkout({
                    preference: {
                        id: order.preferenceId
                    },
                    render: {
                        container: '#wallet_container',
                        label: 'Pagar',
                        autoOpen: true
                    }
                });
                checkoutInitialized.current = true;
            } catch (error) {
                console.error("Error initializing MercadoPago:", error);
            }
        } else {
            console.log("OrderDetail: Condiciones no cumplidas para inicializar MP");
            console.log("OrderDetail: order =", order);
            console.log("OrderDetail: walletContainer =", walletContainer);
            console.log("OrderDetail: PUBLIC_KEY =", PUBLIC_KEY);
        }
    }, [order, loading, PUBLIC_KEY]);  // Depende de 'order', 'loading' y 'PUBLIC_KEY'


    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='order-detail'>
            <h2>Detalles de la Orden</h2>
            <p>Orden ID: {order?._id}</p>
            <p>Nombre: {order?.nombre}</p>
            <p>Apellido: {order?.apellido}</p>
            <p>Teléfono: {order?.telefono}</p>
            <p>Email: {order?.email}</p>
            <h3>Productos</h3>
            <ul>
                {products.map((product, index) => {
                    console.log(`Rendering item ${index}:`, product);
                    return (
                        <li key={product?._id}>
                            Producto: {product?.nombre || 'Nombre no encontrado'}, Cantidad: {order?.items[index]?.cantidad}
                        </li>
                    );
                })}
            </ul>
            <p>Total: ${order?.total}</p>
            <div id="wallet_container"></div>
        </div>
    );
}

export default OrderDetail; 


// INICIAL ( ok local)
/*
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/config';
import './OrderDetail.css';

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const mp = new window.MercadoPago(PUBLIC_KEY, {
    locale: 'es-AR'
});

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const checkoutInitialized = useRef(false);

    console.log("OrderDetail: id from useParams:", id); // Loguea el ID

    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true);
            setError(null);
            try {
                const orderResponse = await api.get(`/ordenes/${id}`);
                setOrder(orderResponse.data);
                const productIds = orderResponse.data.items.map(item => item.producto);
                const productPromises = productIds.map(productId => api.get(`/productos/${productId}`));
                const productResponses = await Promise.all(productPromises);
                setProducts(productResponses.map(response => response.data));
            } catch (err) {
                console.error('Error al obtener los detalles de la orden:', err);
                setError('Error al cargar los detalles de la orden.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [id]);

    useEffect(() => {
        console.log("OrderDetail: order?.preferenceId:", order?.preferenceId);
        console.log("OrderDetail: checkoutInitialized.current:", checkoutInitialized.current);
        if (order?.preferenceId && !checkoutInitialized.current) {
            console.log("Initializing MercadoPago checkout");
            const walletContainer = document.getElementById('wallet_container');
            if (walletContainer) {
                console.log("OrderDetail: walletContainer exists");
                walletContainer.innerHTML = ''; // Vaciar el contenedor
            } else {
                console.log("OrderDetail: walletContainer NOT found");
            }
            try {
                mp.checkout({
                    preference: {
                        id: order.preferenceId
                    },
                    render: {
                        container: '#wallet_container',
                        label: 'Pagar',
                        autoOpen: true
                    }
                });
                checkoutInitialized.current = true;
            } catch (error) {
                console.error("Error initializing MercadoPago:", error);
            }
        }
    }, [order?.preferenceId]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='order-detail'>
            <h2>Detalles de la Orden</h2>
            <p>Orden ID: {order._id}</p>
            <p>Nombre: {order.nombre}</p>
            <p>Apellido: {order.apellido}</p>
            <p>Teléfono: {order.telefono}</p>
            <p>Email: {order.email}</p>
            <h3>Productos</h3>
            <ul>
                {order.items.map((item, index) => {
                    console.log(`Rendering item ${index}:`, item, products[index]); // Loguea cada item y producto
                    return (
                        <li key={item.producto}>
                            Producto: {products[index]?.nombre || 'Nombre no encontrado'}, Cantidad: {item.cantidad}
                        </li>
                    );
                })}
            </ul>
            <p>Total: ${order.total}</p>
            <div id="wallet_container"></div>
        </div>
    );
}

export default OrderDetail; */


//  Modificacion sugerida 17/2/25  ( 1 )
/*
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/config';
import './OrderDetail.css';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const checkoutInitialized = useRef(false);
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY; // Obtener la clave aquí

    console.log("OrderDetail: id from useParams:", id);

    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true);
            setError(null);
            try {
                const orderResponse = await api.get(`/ordenes/${id}`);
                setOrder(orderResponse.data);
                const productIds = orderResponse.data.items.map(item => item.producto);
                const productPromises = productIds.map(productId => api.get(`/productos/${productId}`));
                const productResponses = await Promise.all(productPromises);
                setProducts(productResponses.map(response => response.data));
            } catch (err) {
                console.error('Error al obtener los detalles de la orden:', err);
                setError('Error al cargar los detalles de la orden.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [id]);

    useEffect(() => {
        console.log("OrderDetail: order?.preferenceId:", order?.preferenceId);
        console.log("OrderDetail: checkoutInitialized.current:", checkoutInitialized.current);

        if (order?.preferenceId && !checkoutInitialized.current && PUBLIC_KEY) {
            console.log("Initializing MercadoPago checkout");
            const walletContainer = document.getElementById('wallet_container');

            if (walletContainer) {
                console.log("OrderDetail: walletContainer exists");
                walletContainer.innerHTML = ''; // Vaciar el contenedor
                try {
                    const mp = new window.MercadoPago(PUBLIC_KEY, { // Inicializar aquí
                        locale: 'es-AR'
                    });
                    mp.checkout({
                        preference: {
                            id: order.preferenceId
                        },
                        render: {
                            container: '#wallet_container',
                            label: 'Pagar',
                            autoOpen: true
                        }
                    });
                    checkoutInitialized.current = true;
                } catch (error) {
                    console.error("Error initializing MercadoPago:", error);
                }
            } else {
                console.log("OrderDetail: walletContainer NOT found");
            }
        }
    }, [order?.preferenceId, PUBLIC_KEY]);  //Dependencia de PUBLIC_KEY

    console.log("useEffect MercadoPago: PUBLIC_KEY =", PUBLIC_KEY, "preferenceId =", order?. preferenceId);
    console.log("useEffect MercadoPago: walletContainer =", walletContainer);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='order-detail'>
            <h2>Detalles de la Orden</h2>
            <p>Orden ID: {order._id}</p>
            <p>Nombre: {order.nombre}</p>
            <p>Apellido: {order.apellido}</p>
            <p>Teléfono: {order.telefono}</p>
            <p>Email: {order.email}</p>
            <h3>Productos</h3>
            <ul>
                {order.items.map((item, index) => {
                    console.log(`Rendering item ${index}:`, item, products[index]);
                    return (
                        <li key={item.producto}>
                            Producto: {products[index]?.nombre || 'Nombre no encontrado'}, Cantidad: {item.cantidad}
                        </li>
                    );
                })}
            </ul>
            <p>Total: ${order.total}</p>
            <div id="wallet_container"></div>
        </div>
    );
}

export default OrderDetail;



/* controles :
Verifica la variable de entorno: Imprime el valor de 'PUB en la consola para asegurarte de que esté definido y tenga el valor correcto. PUBLIC_KEYconsole.log("PUBLIC_KEY:", PUBLIC_KEY);

Logs detallados: Añade logs dentro del 'us Para rastrear el flujo de ejecución:useEffect

console.log("useEffect MercadoPago: PUBLIC_KEY =", PUBLIC_KEY, "preferenceId =", order?. preferenceId);
console.log("useEffect MercadoPago: walletContainer =", walletContainer);

Inspecciona la red: Usa las herramientas de desarrollo del navegador para inspeccionar la pestaña "Network" y verificar que la SDK de Mercado Pago se esté cargando sin errores.

Verifica la respuesta de la API: Asegúrate de que la respuesta de tu API contenga el /ordenes/${id}preferenceId.
*/



// modificacion ( 2 )
/*
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/config';
import './OrderDetail.css';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const checkoutInitialized = useRef(false);
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

    console.log("OrderDetail: id from useParams:", id);

    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true);
            setError(null);
            try {
                const orderResponse = await api.get(`/ordenes/${id}`);
                console.log("API Response:", orderResponse.data);        // VER 

                // Verifica si orderResponse.data es un array y extrae el objeto
                const orderData = Array.isArray(orderResponse.data) ? orderResponse.data[0] : orderResponse.data;

                setOrder(orderData);
                console.log("Order state after setting:", orderData); //  VER  <-- Log AFTER setting the state

                const productIds = orderData.items.map(item => item.producto);
                const productPromises = productIds.map(async productId => {
                    const productResponse = await api.get(`/productos/${productId}`);
                    console.log("Product API Response:", productResponse.data);
                    return productResponse.data;
                });
                const productResponses = await Promise.all(productPromises);
                setProducts(productResponses);
            } catch (err) {
                console.error('Error al obtener los detalles de la orden:', err);
                setError('Error al cargar los detalles de la orden.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [id]);

    useEffect(() => {
        console.log("OrderDetail: order?.preferenceId:", order?.preferenceId);   //  VER
        console.log("useEffect MercadoPago: PUBLIC_KEY =", PUBLIC_KEY, "preferenceId =", order?.preferenceId);

        if (order?.preferenceId && !checkoutInitialized.current && PUBLIC_KEY) {
            console.log("Initializing MercadoPago checkout");
            const walletContainer = document.getElementById('wallet_container');

            if (walletContainer) {
                console.log("OrderDetail: walletContainer exists");
                walletContainer.innerHTML = '';

                try {
                    const mp = new window.MercadoPago(PUBLIC_KEY, {
                        locale: 'es-AR'
                    });

                    mp.checkout({
                        preference: {
                            id: order.preferenceId
                        },
                        render: {
                            container: '#wallet_container',
                            label: 'Pagar',
                            autoOpen: true
                        }
                    });
                    checkoutInitialized.current = true;
                } catch (error) {
                    console.error("Error initializing MercadoPago:", error);
                }
            } else {
                console.log("OrderDetail: walletContainer NOT found");
            }
        }
    }, [order?.preferenceId, PUBLIC_KEY]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='order-detail'>
            <h2>Detalles de la Orden</h2>
            <p>Orden ID: {order?._id}</p>
            <p>Nombre: {order?.nombre}</p>
            <p>Apellido: {order?.apellido}</p>
            <p>Teléfono: {order?.telefono}</p>
            <p>Email: {order?.email}</p>
            <h3>Productos</h3>
            <ul>
                {products.map((product, index) => {
                    console.log(`Rendering item ${index}:`, product);
                    return (
                        <li key={product?._id}>
                            Producto: {product?.nombre || 'Nombre no encontrado'}, Cantidad: {order?.items[index]?.cantidad}
                        </li>
                    );
                })}
            </ul>
            <p>Total: ${order?.total}</p>
            <div id="wallet_container"></div>
        </div>
    );
}

export default OrderDetail;  */







