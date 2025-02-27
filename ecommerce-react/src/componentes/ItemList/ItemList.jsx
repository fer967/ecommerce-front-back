import Item from "../Item/Item";
import './ItemList.css';

const ItemList = ({ productos }) => {
    return (
        <div className="contenedorProductos">
            {
                productos.map(producto => <Item key={producto._id} {...producto} image={producto.image} />)
            }
        </div>
    )
}

export default ItemList;


