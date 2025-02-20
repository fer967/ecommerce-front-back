import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import api from "../../services/config.js"
import './Checkout.css';

const Checkout = () => {
    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [ordenId, setOrdenId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const manejadorSubmit = (event) => {
        event.preventDefault();
        // Verificamos que todos los campos estén completos
        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor completa todos los campos.");
            return;
        }
        // Validamos que el campo del email coincida
        if (email !== emailConfirmacion) {
            setError("Los emails no coinciden.");
            return;
        }
        // Creamos un objeto con todos los datos de la orden de compra
        const orden = {
            items: carrito.map(producto => ({
                producto: producto.item._id,
                cantidad: producto.cantidad
            })),
            total,
            nombre,
            apellido,
            telefono,
            email
        };
        // Realizamos la solicitud POST al backend
        api.post('/ordenes', orden)    // local
            .then(response => {
                setOrdenId(response.data._id); // Suponiendo que el ID se devuelve en la respuesta del servidor
                vaciarCarrito();
                navigate(`/order/${response.data._id}`); // Redirigir a la vista de detalles de la orden
            })
            .catch(error => {
                console.error('Error al realizar la compra:', error);
                setError("Error al realizar la compra. Por favor, inténtalo de nuevo más tarde.");
            });
            
    }
    return (
        <div className="checkout">
            <h2> Checkout </h2>
            <form onSubmit={manejadorSubmit} className="formulario">
                {
                    carrito.map(producto => (
                        <div key={producto.item._id}>
                            <h4>{producto.item.nombre}</h4>
                            <p> cantidad : {producto.cantidad} </p>
                            <p> Precio: $ {producto.item.precio} </p>
                        </div>
                    ))
                }
                <br />
                <div className="form-group">
                  <h4>ingresa tus datos</h4>
                    <label htmlFor=""> </label>
                    <input className ="input" type="text" placeholder="nombre" onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor=""> </label>
                    <input className ="input" type="text" placeholder="apellido" onChange={(e) => setApellido(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="">  </label>
                    <input className ="input" type="text" placeholder="telefono" onChange={(e) => setTelefono(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor=""> </label>
                    <input className ="input" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="">  </label>
                    <input className ="input" type="email" placeholder="confirme correo" onChange={(e) => setEmailConfirmacion(e.target.value)} />
                </div>
                {
                    error && <p style={{ color: "red" }}> {error} </p>
                }
                <button type="submit" className="orden"> Finalizar Orden </button>
                {
                    ordenId && (
                        <strong className="ordenId">¡Gracias por su compra! Tu número de orden es: {ordenId} </strong>
                    )
                }
            </form>
        </div>
    )
}

export default Checkout;

/*
// En Checkout.jsx y OrderDetail.jsx
import api from '../ruta/a/tu/instancia/axios'; // Ajusta la ruta

// Luego, usa 'api' para hacer las solicitudes:
api.post('/ordenes', orden) // Ahora la URL será http://localhost:3000/api/ordenes
  .then(response => { ... })
  .catch(error => { ... });

api.get(`/ordenes/${id}`) // Ahora la URL será http://localhost:3000/api/ordenes/:id
  .then(response => { ... })
  .catch(error => { ... });
*/







/*  studio AI
import React from 'react';
import axios from 'axios';

const Checkout = () => {
  const handleCheckout = async () => {
    try {
      const orderData = {
        // Detalles de la orden (productos, cantidades, etc.)
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 1 },
        ],
        total: 100,
      };

      // *** LINEA 52 (aproximadamente) ***
      const response = await axios.post('/api/ordenes', orderData);
      console.log('Compra realizada:', response.data);

      // Redirigir al usuario a la página de confirmación o a Mercado Pago
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  };

  return (
    <div>
      { ... tu interfaz de usuario para el checkout ... }
      <button onClick={handleCheckout}>Realizar Pago</button>
    </div>
  );
};

export default Checkout;*/


// ejemplo copilot x error :
            /*axios.post(`${API_URL}/api/ordenes`, orden)
                .then(response => {
                console.log('Compra realizada con éxito:', response);
            })
            .catch(error => {
            if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error en la respuesta del servidor:', error.response.data);
            } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
        } else {
      // Algo pasó al configurar la solicitud que provocó un error
        console.error('Error al configurar la solicitud:', error.message);
        }
        });*/

