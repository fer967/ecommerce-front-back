const express = require("express");
const router = express.Router();
const ProductoModel = require("../models/productos.model.js");
const OrdenModel = require("../models/ordenes.model.js");
const mercadopago = require("mercadopago");
require('dotenv').config();

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

// Obtener todas las órdenes
router.get('/', async (req, res) => {
    try {
        const ordenes = await OrdenModel.find();
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// modificacion :
router.post('/', async (req, res) => {
    const { items, total, nombre, apellido, telefono, email } = req.body;
    try {
        // 1. Verificar la disponibilidad de stock antes de crear la orden
        for (const item of items) {
            const producto = await ProductoModel.findById(item.producto);
            if (!producto || producto.stock < item.cantidad) {
                return res.status(400).json({ message: 'Producto no disponible o stock insuficiente' });
            }
        }
        // 2. Crear la orden
        const orden = new OrdenModel({
            items,
            total,
            nombre,
            apellido,
            telefono,
            email
        });
        const nuevaOrden = await orden.save();
        // 3. Actualizar el stock de los productos
        for (const item of items) {
            await ProductoModel.findByIdAndUpdate(item.producto, { $inc: { stock: -item.cantidad } });
        }
        // 4. Crear la preferencia de pago
        const preferenceItems = [];
        for (const item of items) {
            const producto = await ProductoModel.findById(item.producto); // Obtener la información del producto
            if (!producto) {
                return res.status(400).json({ message: 'Producto no encontrado' });
            }
            preferenceItems.push({
                title: producto.nombre, // Usar el nombre del producto
                unit_price: producto.precio, // Usar el precio del producto
                quantity: item.cantidad,
                currency_id: "ARS",
                description: producto.descripcion, // Puedes agregar una descripción
                // picture_url: producto.image, // Si tienes una URL de imagen
            });
        }
        const preference = {
            items: preferenceItems,  // Usar los items construidos correctamente
            back_urls: {  // Ajusta estas URLs a tu frontend
                /*success: "http://localhost:5173/success", 
                failure: "http://localhost:5173/failure", 
                pending: "http://localhost:5173/pending"  */
                success: "https://front-wp3g.onrender.com",
                failure: "https://front-wp3g.onrender.com",
                pending: "https://front-wp3g.onrender.com",
            },
            auto_return: 'approved' // Asegura que Mercado Pago redirija automáticamente
        };

        console.log("preferenceItems:", preferenceItems); // Loguea los items
        console.log("preference:", preference); // Loguea la preferencia

        const response = await mercadopago.preferences.create(preference);
        console.log("MercadoPago response:", response); // Loguea la respuesta de MP

        nuevaOrden.preferenceId = response.body.id; // Guardar el ID de la preferencia
        console.log("nuevaOrden.preferenceId:", nuevaOrden.preferenceId); // Loguea el preferenceId
        
        await nuevaOrden.save();
        console.log("Orden guardada con preferenceId:", nuevaOrden.preferenceId); // Loguea después de guardar
        res.status(201).json(nuevaOrden); // Devolver la orden con el preferenceId
    } catch (error) {
        console.error("Error al crear la orden y la preferencia:", error); // Loguear el error
        console.error("Error stack:", error.stack); // Agrega esto
        res.status(500).json({ message: error.message });
    }
});

// Obtener una orden por ID
router.get('/:id', async (req, res) => {
    try {
        const orden = await OrdenModel.findById(req.params.id);
        if (orden) {
            res.json(orden); // Devuelve la orden completa
        } else {
            res.status(404).json({ message: "Orden no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;






