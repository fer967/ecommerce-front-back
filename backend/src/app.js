const express = require("express");
const app = express(); 
const PUERTO = process.env.PUERTO || 3000;
const productosRouter = require("./routes/productos.router.js");
const ordenesRouter = require("./routes/ordenes.router.js");
const authRouter = require('./routes/auth.router.js');
const Product = require("./models/productos.model.js");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurar almacenamiento de Cloudinary para multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Carpeta en Cloudinary donde se guardarán las imágenes
        format: async (req, file) => 'jpg', // Formato de la imagen
        public_id: (req, file) => Date.now() + '-' + file.originalname // Nombre del archivo
    }
});

const upload = multer({ storage: storage }); 

const connect = mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Conectado a la DB") )
.catch(err => console.error('Error al conectar a la DB:', err));

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors({
    //origin: "http://localhost:5173",
    origin: "https://front-wp3g.onrender.com", 
    credentials: true
}));

app.use("/api/productos", productosRouter);
app.use("/api/ordenes", ordenesRouter);
app.use('/api/auth', authRouter);

app.post('/upload', upload.single('image'), (req, res) => {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
    }
    const image = req.file.path;  // URL de la imagen en Cloudinary
    const newProduct = new Product({
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        image: req.file.path
    });
    newProduct.save()
        .then(() => res.status(201).json({ message: 'Producto creado con éxito' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.listen(PUERTO, () => {
    console.log(`server in http://localhost:${PUERTO}`)});

// ver ejemplo de Studio :
/*
const express = require('express');
const authRoutes = require('./routes/auth'); // Ajusta la ruta si es necesario

const app = express();
app.use(express.json()); // Para analizar el cuerpo de las solicitudes JSON

app.use('/api/auth', authRoutes); // Todas las rutas de autenticación estarán bajo /api/auth

// ... el resto de tu aplicación ...
*/







