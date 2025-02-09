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





// PAGINATE (ok en backend)

/*const express = require("express");
const router = express.Router();
const ProductoModel = require("../models/productos.model.js");

// Ruta para obtener todos los productos o filtrar por categoría con paginación
router.get('/', async (req, res) => {
    const { categoria, page = 1, limit = 2 } = req.query; // Extraer los parámetros de consulta "categoria", "page" y "limit"
    try {
        let query = {};
        if (categoria) {
            query.categoria = categoria;
        }
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        };
        const productos = await ProductoModel.paginate(query, options);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener detalles de un producto específico por su ID
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

module.exports = router; */