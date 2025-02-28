
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import config from "../../services/config.js";
import './ItemListContainer.css';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const { idCategoria } = useParams();

    useEffect(() => {
        const endpoint = idCategoria ? `/productos?categoria=${idCategoria}` : '/productos';

        config.get(endpoint)
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, [idCategoria]);

    return (
        <div className="contenedorProductos">
            <h2>Nuestros productos</h2>
            <div className="container">
                <ItemList productos={productos} />
            </div>
        </div>
    ); 
}; 

export default ItemListContainer;







/*
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
            <div className="home">
                <h3>Tenemos lo que necesitas</h3>
                <p>Instrumentos Nuevos y Usados</p>
                <p>Accesorios</p>
                <p>Cursos propios</p>
                <p>Entrega a domicilio</p>
                <p>Atencion personalizada</p>
            </div>
            <div className="home">
                <h3>Visitanos en :</h3>
                <p>Av. San Martin 1850</p>
                <p>WhatsApp  03518443399</p>
                <h3>Seguinos en :</h3>
                <p>Facebook</p>
                <p>Instagram</p>
            </div>
            <h2>Nuestros productos</h2>
            <div className="container">
                <ItemList productos={productos} />
            </div>
        </div>
    )
}

export default ItemListContainer;  */























