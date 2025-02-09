import { useState, useContext } from 'react';
import Contador from '../Contador/Contador';
import { Link } from 'react-router-dom';
import './ItemDetail.css';
import { CarritoContext } from '../../context/CarritoContext';

const ItemDetail = ({ _id, nombre, stock, precio, image }) => {
    const [agregarCantidad, setAgregarCantidad] = useState(0);
    const { agregarAlCarrito } = useContext(CarritoContext);
    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad);
        const item = { _id, nombre, precio };
        agregarAlCarrito(item, cantidad);
    }
    return (
        <div className='contenedorItem'>
            <h2>{nombre} </h2>
            <img src={image} alt={nombre} /> {/* Usa directamente la URL de Cloudinary */}
            <p>Precio:{precio} </p>
            <p>STOCK:{stock} </p>
            {
                agregarCantidad > 0 ? (<Link to="/cart" className='comprar'>Terminar Compra</Link>) : (<Contador inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />)
            }
        </div>
    )
}

export default ItemDetail;








