import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import config from "../../services/config.js";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
    const [producto, setProducto] = useState(null);
    const { idItem } = useParams();
    useEffect(() => {
        // Hacer una solicitud GET al endpoint /productos/{idItem} del backend
        config.get(`/productos/${idItem}`)
            .then(response => {
                setProducto(response.data); // Suponiendo que los datos del producto se devuelven como un objeto
            })
            .catch(error => {
                console.error('Error al obtener el producto:', error);
            });
    }, [idItem]);
    return (
        <div>
            {producto && <ItemDetail {...producto} />}
        </div>
    )
}

export default ItemDetailContainer;

/*
import { useState } from 'react';
import './ItemDetailContainer.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc,getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import ItemDetail from '../ItemDetail/ItemDetail';

export default function ItemDetailContainer(){
    const[product, setProduct] = useState(null);
    const[loading, setLoading] = useState(true);
    const{itemId} = useParams();

    useEffect(()=>{
        setLoading(true)
        const docRef = doc(db,'products',itemId)
            getDoc(docRef).then(response => {
                const data = response.data()
                const productAdapted = {id:response.id, ...data}
                setProduct(productAdapted)
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [itemId])

    return(
        <div className='detail-cont'>
            <ItemDetail {...product}/>
        </div>
    );
}
*/