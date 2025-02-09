const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    categoria: String,
    image: String
});

const ProductoModel = mongoose.model("productos", productoSchema);

module.exports = ProductoModel; 



// Paginate
/*const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    categoria: String,
    image: String
});

productoSchema.plugin(mongoosePaginate);

const ProductoModel = mongoose.model("productos", productoSchema);

module.exports = ProductoModel; */


