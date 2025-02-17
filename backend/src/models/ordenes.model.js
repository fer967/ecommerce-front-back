const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
    items: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'productos',
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    preferenceId: { // Agrega este campo
        type: String,
        required: false // o true, dependiendo de si es siempre obligatorio
    }
}, { timestamps: true }); // Agrega timestamps para fecha de creacion y modificacion

const OrdenModel = mongoose.model("ordenes", ordenSchema);

module.exports = OrdenModel; 




