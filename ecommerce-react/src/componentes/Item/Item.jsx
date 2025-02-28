import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ _id, nombre, marca, precio, image }) => {
    return (
        <div className='cardProducto'>
            <h3>{nombre}</h3>
            <img src={image} alt={nombre} /> {/* Usa directamente la URL de Cloudinary */}
            <p>marca: {marca}</p>
            <p>precio: {precio}</p>
            <Link className='btn' to={`/item/${_id}`}>Ver Detalles</Link>
        </div>
    );
}

export default Item;
/*
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ _id, nombre, stock, precio, image }) => {
    const protocol = window.location.protocol;
    const imageUrl = `${protocol}//localhost:3000/${image}`; 
    //const imageUrl = `https://localhost:3000/${image}`; // Asegúrate de que la URL es correcta

    return (
        <div className='cardProducto'>
            <img src={imageUrl} alt={nombre} />
            <h3>{nombre}</h3>
            <p>Precio: {precio}</p>
            <p>ID: {_id}</p>
            <p>STOCK: {stock}</p>
            <Link className='btn' to={`/item/${_id}`}>Ver Detalles</Link>
        </div>
    );
}

export default Item; */


