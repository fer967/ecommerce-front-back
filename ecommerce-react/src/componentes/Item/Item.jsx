import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ _id, nombre, stock, precio, image }) => {
    const imageUrl = `https://localhost:3000/${image}`; // Asegúrate de que la URL es correcta

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

export default Item;


