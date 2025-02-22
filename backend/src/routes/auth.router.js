const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuario.model.js');
const router = express.Router();
require('dotenv').config();

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

// Ruta de login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1. Buscar el usuario por correo electrónico
        const usuario = await UsuarioModel.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' }); // Usuario no encontrado
        }
        // 2. Comparar la contraseña ingresada con la contraseña hasheada
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Credenciales inválidas' }); // Contraseña incorrecta
        }
        // 3. Generar un token JWT si las credenciales son válidas
        const payload = {
            usuarioId: usuario._id, // Puedes incluir información del usuario en el payload
            email: usuario.email,
            nombre: usuario.nombre
        };
        const secretKey = process.env.JWT_SECRET; 
        const options = {
            expiresIn: '1h' // El token expira en 1 hora
        };
        const token = jwt.sign(payload, secretKey, options);
        // 4. Enviar el token al cliente
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error("Error during login:", error); // Log the error for debugging
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});  

module.exports = router;

// JWT_SECRET=Usuario_1986-ElecTroNica-2025

