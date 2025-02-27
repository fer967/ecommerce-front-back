import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import config from "../../services/config.js";
import './ItemListContainer.css';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const { idCategoria } = useParams(); // Extrae la categoría de los parámetros de la URL

    useEffect(() => {
        // Construir la URL de la solicitud dependiendo de si hay una categoría seleccionada
        const endpoint = idCategoria ? `/productos?categoria=${idCategoria}` : '/productos';
        // Hacer una solicitud GET al endpoint del backend
        config.get(endpoint)
            .then(response => {
                setProductos(response.data); // Suponiendo que los datos se devuelven como un array de productos
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, [idCategoria]); // Volver a ejecutar el efecto cuando cambia idCategoria
    return (
        <div className="contenedorProductos">
            <h2>Nuestros productos</h2>
            <div className="container">
                <ItemList productos={productos} />
            </div>
        </div>
    )
}

export default ItemListContainer;























