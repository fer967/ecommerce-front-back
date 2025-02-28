import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';
const API_URL = import.meta.env.VITE_API_URL;      // DEPLOY
//const API_URL = 'http://localhost:3000';

const UploadForm = () => {                                  
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState('');
    const [img, setImg] = useState(null);
    const [marca, setMarca] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('stock', stock);
        formData.append('categoria', categoria);
        formData.append('image', img);
        formData.append('marca', marca);

        try {
            const res = await axios.post(`${API_URL}/upload`, formData, {  
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='upload-form'>
            <h2>Ingresar producto</h2>
            <input className ="input" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
            <input className ="input" type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required />
            <input className ="input" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" required />
            <input className ="input" type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required />
            <input className ="input" type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoría" required />
            <input className ="input" type="text" value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Marca" required />
            <input className ="input" type="file" onChange={(e) => setImg(e.target.files[0])} required />
            <button type="submit" className='upload'>Subir Producto</button>
        </form>
    );
};

export default UploadForm;  