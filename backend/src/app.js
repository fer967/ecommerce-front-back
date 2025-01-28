const express = require("express");
const app = express(); 
const PUERTO = process.env.PUERTO || 3000;
const productosRouter = require("./routes/productos.router.js");
const ordenesRouter = require("./routes/ordenes.router.js");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connect = mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Conectado a la DB") );

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/productos", productosRouter);
app.use("/api/ordenes", ordenesRouter);

app.listen(PUERTO, () => {
    console.log(`server in http://localhost:${PUERTO}`)});



