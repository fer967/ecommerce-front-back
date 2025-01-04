import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ _id, nombre, stock, precio, img }) => {
    return (
        <div className='cardProducto'>
            <img src={img} alt={nombre} />
            <h3>Nombre: {nombre} </h3>
            <p>Precio: {precio} </p>
            <p>ID: {_id} </p>
            <p>STOCK: {stock} </p>
            <Link className='btn' to={`/item/${_id}`}> Ver Detalles </Link>
        </div>
    )
}

export default Item;

/*
import './Item.css';
import { Link } from 'react-router-dom';

export default function Item({ id, title, image, price, stock }) {
    return (
        <div className='single-item-container'>
            <img src={image} alt={title} />
            <section className='single-item'>
                <h2>{title}</h2>
                <p>precio: ${price}</p>
                <p>stock:{stock}</p>
                <Link to={`/item/${id}`} className="Option">ver detalles</Link>
            </section>
        </div>
    );
}
*/