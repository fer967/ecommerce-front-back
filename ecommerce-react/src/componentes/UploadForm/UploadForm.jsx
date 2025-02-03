/*import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState('');
    const [img, setImg] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('stock', stock);
        formData.append('categoria', categoria);
        formData.append('image', img);

        try {
            const res = await axios.post('http://localhost:3000/upload', formData, {
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
        <form onSubmit={handleSubmit}>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required />
            <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" required />
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required />
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoría" required />
            <input type="file" onChange={(e) => setImg(e.target.files[0])} required />
            <button type="submit">Subir Producto</button>
        </form>
    );
};

export default UploadForm;  */