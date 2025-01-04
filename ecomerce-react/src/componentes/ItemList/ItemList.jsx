import Item from "../Item/Item";
import './ItemList.css';

const ItemList = ({ productos }) => {
    return (
        <div className="contenedorProductos">
            {
                productos.map(producto => <Item key={producto._id} {...producto} />)
            }
        </div>
    )
}

export default ItemList;


/*
import './ItemList.css';
import Item from '../Item/Item';

export default function ItemList({products}){
    return(
        <div className='list'>
            {products.map(prod => <Item key={prod.id} {...prod}/>)}
        </div>
    );
}
*/