import { useState, useContext } from 'react';
import Contador from '../Contador/Contador';
import { Link } from 'react-router-dom';
import './ItemDetail.css';
import { CarritoContext } from '../../context/CarritoContext';

const ItemDetail = ({ _id, nombre, stock, precio, image }) => {
    //Creamos un estado local con la cantidad de productos agregados. 
    const [agregarCantidad, setAgregarCantidad] = useState(0);

    //Cambios en la clase 6: 
    const { agregarAlCarrito } = useContext(CarritoContext);

    //Creamos una función manejadora de la cantidad: 
    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad);
        //console.log("Productos agregados: " + cantidad);
        //Y ahora acá voy a crear un objeto con el item y la cantidad: 
        const item = { _id, nombre, precio };
        agregarAlCarrito(item, cantidad);
    }
    
    const protocol = window.location.protocol;
    const imageUrl = `${protocol}//localhost:3000${image}`;
    
    //const imageUrl = `https://localhost:3000/${image}`; 
    return (
        <div className='contenedorItem'>
            <h2>{nombre} </h2>
            <img src={imageUrl} alt={nombre} />
            <p>Precio:{precio} </p>
            <p>ID:{_id} </p>
            <p>STOCK:{stock} </p>
            {
                agregarCantidad > 0 ? (<Link to="/cart">Terminar Compra</Link>) : (<Contador inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />)
            }
        </div>
    )
}

export default ItemDetail;








