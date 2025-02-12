const express = require("express");
const router = express.Router();
const ProductoModel = require("../models/productos.model.js");
const OrdenModel = require("../models/ordenes.model.js");
//const nodemailer = require('nodemailer');

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

router.get('/:id', async (req, res) => {
    try {
        const orden = await OrdenModel.findById(req.params.id);
        if (orden) {
            res.json(orden);
        } else {
            res.status(404).json({ message: "Orden no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


// NODEMAILER :
/*EMAIL_USER=gabrielfcorrea@gmail.com
EMAIL_PASS=Iwne howx szmf qsjd */
/*
Opción 1: Usar una contraseña de aplicación
Ve a tu cuenta de Google y accede a la sección de Seguridad.
En la sección "Iniciar sesión en Google", selecciona "Contraseñas de aplicaciones".
Genera una nueva contraseña de aplicación y úsala en lugar de tu contraseña normal en la variable de entorno EMAIL_PASS.

Opción 2: Habilitar el acceso a aplicaciones menos seguras
Ve a tu cuenta de Google y accede a la sección de Seguridad.
En la sección "Acceso de aplicaciones poco seguras", habilita el acceso a aplicaciones menos seguras.


// Configura el transportador de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otros servicios como Outlook, Yahoo, etc.
    auth: {
        user: process.env.EMAIL_USER, // Tu dirección de correo electrónico
        pass: process.env.EMAIL_PASS  // Tu contraseña de correo electrónico
    }
});

// Verifica la configuración del transportador
transporter.verify((error, success) => {
    if (error) {
        console.error('Error al configurar nodemailer:', error);
    } else {
        console.log('Nodemailer configurado correctamente');
    }
});

router.post('/api/ordenes', async (req, res) => {
    try {
        const nuevaOrden = new OrdenModel(req.body);
        await nuevaOrden.save();

        // Configura el contenido del correo electrónico
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email, // Dirección de correo electrónico del cliente
            subject: 'Confirmación de Orden',
            text: `Hola ${req.body.nombre},\n\nGracias por tu compra. Aquí están los detalles de tu orden:\n\nOrden ID: ${nuevaOrden._id}\nNombre: ${req.body.nombre}\nApellido: ${req.body.apellido}\nTeléfono: ${req.body.telefono}\nEmail: ${req.body.email}\nTotal: $${req.body.total}\n\nProductos:\n${req.body.items.map(item => `Producto ID: ${item.producto}, Cantidad: ${item.cantidad}`).join('\n')}\n\nGracias por comprar con nosotros.\n\nSaludos,\nTu Tienda`
        };

        // Envía el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
            } else {
                console.log('Correo electrónico enviado:', info.response);
            }
        });

        res.status(201).json(nuevaOrden);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


*/

