const express = require("express");
const router = express.Router();
const ProductoModel = require("../models/productos.model.js");

router.get('/', async (req, res) => {
    const { categoria } = req.query; 
    try {
        let productos;
        if (categoria) {
            
            productos = await ProductoModel.find({ categoria });
        } else {
            
            productos = await ProductoModel.find();
        }
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const producto = await ProductoModel.findById(req.params.id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 





