// agrego variables de entorno
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderDetail.css';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;
    //const API_URL = 'http://localhost:3000';

    useEffect(() => {
        axios.get(`${API_URL}/api/ordenes/${id}`)
            .then(response => {
                setOrder(response.data);
                const productIds = response.data.items.map(item => item.producto);
                return axios.all(productIds.map(productId => axios.get(`${API_URL}/api/productos/${productId}`)));
            })
            .then(responses => {
                setProducts(responses.map(response => response.data));
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la orden:', error);
            });
    }, [id, API_URL]);

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
        </div>
    );
}

export default OrderDetail;





// modificacion para mostrar nombre del producto comprado (error en Render)
/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderDetail.css';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/api/ordenes/${id}`)
            .then(response => {
                setOrder(response.data);
                const productIds = response.data.items.map(item => item.producto);
                return axios.all(productIds.map(productId => axios.get(`http://localhost:3000/api/productos/${productId}`)));
            })
            .then(responses => {
                setProducts(responses.map(response => response.data));
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la orden:', error);
            });
    }, [id]);
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
        </div>
    );
}

export default OrderDetail;*/



/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderDetail.css';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/ordenes/${id}`)
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la orden:', error);
            });
    }, [id]);

    if (!order) {
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
                {order.items.map(item => (
                    <li key={item.producto}>
                        Producto ID: {item.producto}, Cantidad: {item.cantidad}
                    </li>
                ))}
            </ul>
            <p>Total: ${order.total}</p>
        </div>
    );
}

export default OrderDetail;*/