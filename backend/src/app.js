const express = require("express");
const app = express(); 
const PUERTO = process.env.PUERTO || 8080;
const productosRouter = require("./routes/productos.router.js");
const ordenesRouter = require("./routes/ordenes.router.js");
const mongoose = require("mongoose");
const cors = require('cors');

const connect = mongoose.connect("mongodb+srv://gabriel70080:coder@cluster0.yt1in.mongodb.net/react?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Conectado a la DB") );

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors());

app.use("/api/productos", productosRouter);
app.use("/api/ordenes", ordenesRouter);

app.listen(PUERTO, () => {
    console.log(`server in http://localhost:${PUERTO}`)});



