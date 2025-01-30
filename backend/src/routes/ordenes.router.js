const express = require("express");
const router = express.Router();
const ProductoModel = require("../models/productos.model.js");
const OrdenModel = require("../models/ordenes.model.js");

// Ruta para obtener todas las órdenes
router.get('/', async (req, res) => {
    try {
        const ordenes = await OrdenModel.find();
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { items, total, nombre, apellido, telefono, email } = req.body;
    try {
        // Verificar la disponibilidad de stock antes de crear la orden
        for (const item of items) {
            const producto = await ProductoModel.findById(item.producto);
            if (!producto || producto.stock < item.cantidad) {
                return res.status(400).json({ message: 'Producto no disponible o stock insuficiente' });
            }
        }
        // Crear la orden
        const orden = new OrdenModel({
            items,
            total,
            nombre,
            apellido,
            telefono,
            email
        });
        const nuevaOrden = await orden.save();
        // Actualizar el stock de los productos
        for (const item of items) {
            await ProductoModel.findByIdAndUpdate(item.producto, { $inc: { stock: -item.cantidad } });
        }
        res.status(201).json(nuevaOrden);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

