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

export default OrderDetail;


/*
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/config';
import './OrderDetail.css';

const mp = new window.MercadoPago('APP_USR-db6fa377-45fe-498d-8e19-8c1206e76857', {
    locale: 'es-AR'
});

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const checkoutInitialized = useRef(false);

    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true);
            setError(null); // Resetear el error al inicio

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
                setLoading(false); // Indicar que la carga ha terminado
            }
        };

        fetchOrderData();
    }, [id]);

    useEffect(() => {
        if (order?.preferenceId && !checkoutInitialized.current) {
            console.log("Initializing MercadoPago checkout");
            const walletContainer = document.getElementById('wallet_container');
            if (walletContainer) {
                walletContainer.innerHTML = ''; // Vaciar el contenedor
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
                //Manejar el error, por ejemplo, mostrar un mensaje al usuario
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
                {order.items.map((item, index) => (
                    <li key={item.producto}>
                        Producto: {products[index]?.nombre || 'Nombre no encontrado'}, Cantidad: {item.cantidad}
                    </li>
                ))}
            </ul>
            <p>Total: ${order.total}</p>
            <div id="wallet_container"></div>
        </div>
    );
}

export default OrderDetail;*/




// penultima modificacion sugerida :
/*import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/config';
import './OrderDetail.css';

const mp = new window.MercadoPago('APP_USR-db6fa377-45fe-498d-8e19-8c1206e76857', {
    locale: 'es-AR'
});

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const checkoutInitialized = useRef(false);

    useEffect(() => {
        api.get(`/ordenes/${id}`)
            .then(response => {
                setOrder(response.data);
                const productIds = response.data.items.map(item => item.producto);
                // Crear un array de promesas usando api.get para cada productId
                const productPromises = productIds.map(productId => api.get(`/productos/${productId}`)); // CORRECCIÓN: Falta `/` antes de productos
                return Promise.all(productPromises); // Usa Promise.all en lugar de api.all si 'api' no implementa un método 'all' similar
            })
            .then(responses => {
                setProducts(responses.map(response => response.data));
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la orden:', error);
            });
    }, [id, api]);

    useEffect(() => {
        // ver si componente se monta y desmonta :
        //console.log("OrderDetail useEffect triggered");
        if (order?.preferenceId && !checkoutInitialized.current) {
            console.log("Initializing MercadoPago checkout");
            const walletContainer = document.getElementById('wallet_container');
            if (walletContainer) {
                walletContainer.innerHTML = ''; // Vaciar el contenedor
            }
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
        }
    }, [order?.preferenceId]);

    if (!order || products.length === 0) {
        return <p>Cargando...</p>;
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
                {order.items.map((item, index) => (
                    <li key={item.producto}>
                        Producto: {products[index]?.nombre || 'Nombre no encontrado'}, Cantidad: {item.cantidad}
                    </li>
                ))}
            </ul>
            <p>Total: ${order.total}</p>
            <div id="wallet_container"></div>
        </div>
    );
}

export default OrderDetail;   */


// con useRef :  ( ver no esta completo !!!)
/*
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/config';
import './OrderDetail.css';

const mp = new window.MercadoPago('APP_USR-db6fa377-45fe-498d-8e19-8c1206e76857', {
    locale: 'es-AR'
});

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const checkoutInitialized = useRef(false); // <-- useRef

    useEffect(() => {
        api.get(`/ordenes/${id}`)
            .then(response => {
                setOrder(response.data);
                const productIds = response.data.items.map(item => item.producto);
                const productPromises = productIds.map(productId => api.get(`/productos/${productId}`));
                return Promise.all(productPromises);
            })
            .then(responses => {
                setProducts(responses.map(response => response.data));
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la orden:', error);
            });
    }, [id, api]);

    useEffect(() => {
        if (order?.preferenceId && !checkoutInitialized.current) { // <-- Condición extra
            console.log("Initializing MercadoPago checkout");
            const walletContainer = document.getElementById('wallet_container');
            if (walletContainer) {
                walletContainer.innerHTML = '';
            }
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
            checkoutInitialized.current = true; // <-- Marcar como inicializado
        }
    }, [order?.preferenceId]);
    if (!order || products.length === 0) {
        return <p>Cargando...</p>;
    }
    return (
        <div className='order-detail'>
            <h2>Detalles de la Orden</h2>
            <p>Orden ID: {order._id}</p>
            <p>Nombre: {order.nombre}</p>
            {/* Resto del código }
            <div id="wallet_container"></div>
        </div>
    );
}

export default OrderDetail;   */



/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/config';
//import axios from 'axios';
import './OrderDetail.css';

const mp = new window.MercadoPago('APP_USR-db6fa377-45fe-498d-8e19-8c1206e76857', {
    locale: 'es-AR'
});

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    //const API_URL = import.meta.env.VITE_API_URL;
    //const API_URL = 'http://localhost:3000';

    useEffect(() => {
        //axios.get(`${API_URL}/api/ordenes/${id}`)
        api.get(`/ordenes/${id}`)
            .then(response => {
                setOrder(response.data);
                const productIds = response.data.items.map(item => item.producto);
                return api.all(productIds.map(productId => api.get(`/api/productos/${productId}`)));
            })
            .then(responses => {
                setProducts(responses.map(response => response.data));
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la orden:', error);
            });
    }, [id, api]);
    // modificacion MP :
    useEffect(() => {
        if (order) {
            
            mp.checkout({
                preference: {
                    id: order.preferenceId // ID de la preferencia de pago generada en el backend
                },
                render: {
                    container: '#wallet_container', // Indica el nombre de la clase donde se mostrará el botón de pago
                    label: 'Pagar', // Cambia el texto del botón de pago (opcional)
                }
            });
        }
    }, [order]);
    if (!order || products.length === 0) {
        return <p>Cargando...</p>;
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
                {order.items.map((item, index) => (
                    <li key={item.producto}>
                        Producto: {products[index].nombre}, Cantidad: {item.cantidad}
                    </li>
                ))}
            </ul>
            <p>Total: ${order.total}</p>
            <div id="wallet_container"></div>
        </div>
    );
}

export default OrderDetail; */



/*
// OrderDetail.jsx
import React, { useEffect, useState } from 'react';
// ... otros imports

const mp = new window.MercadoPago('APP_USR-db6fa377-45fe-498d-8e19-8c1206e76857', {
    locale: 'es-AR'
}); // Inicialización FUERA del useEffect

const OrderDetail = () => {
    // ... el resto del componente
    useEffect(() => {
        if (order) {
            mp.checkout({ // Usa la instancia 'mp' ya inicializada
                preference: {
                    id: order.preferenceId
                },
                render: {
                    container: '#wallet_container',
                    label: 'Pagar',
                }
            });
        }
    }, [order]);
    // ...
};

export default OrderDetail;
*/


