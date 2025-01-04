import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import config from "../../services/config.js";

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
        <div>
            <h2>Mis productos</h2>
            <ItemList productos={productos} />
        </div>
    )
}

export default ItemListContainer;

/*
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';
import { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useParams } from 'react-router-dom';

export default function ItemListContainer({ greeting }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();
    useEffect(() => {
        setLoading(true)
        const collectionRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products')
        getDocs(collectionRef).then(response => {
            const productsAdapted = response.docs.map(doc => {
                const data = doc.data()
                return { id: doc.id, ...data }
            })
            setProducts(productsAdapted)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [categoryId]);
    return (
        <div className='container'>
            <h2>{greeting}</h2>
            <ItemList products={products} />
        </div>
    );
}
*/





















