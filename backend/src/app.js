const express = require("express");
const app = express(); 
const PUERTO = process.env.PUERTO || 3000;
const productosRouter = require("./routes/productos.router.js");
const ordenesRouter = require("./routes/ordenes.router.js");
const Product = require("./models/productos.model.js");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const connect = mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Conectado a la DB") );

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors({
    //origin: "http://localhost:5173",
    origin: "https://front-wp3g.onrender.com", 
    credentials: true
}));

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

app.use("/api/productos", productosRouter);
app.use("/api/ordenes", ordenesRouter);

app.post('/upload', upload.single('image'), (req, res) => {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    const image = path.posix.join('/', req.file.path.replace(/\\/g, '/')); 
    //const image= req.file.path;
    const newProduct = new Product({
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        image
    });
    newProduct.save()
        .then(() => res.status(201).json({ message: 'Producto creado con éxito' }))
        .catch(err => res.status(400).json({ error: err.message }));
});


app.listen(PUERTO, () => {
    console.log(`server in http://localhost:${PUERTO}`)});





