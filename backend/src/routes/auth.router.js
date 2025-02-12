const express = require('express');
const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/usuario.model.js');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;
        const existingUsuario = await UsuarioModel.findOne({ email });
        if (existingUsuario) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUsuario = new UsuarioModel({ nombre, apellido, email, password: hashedPassword });
        await newUsuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

module.exports = router;