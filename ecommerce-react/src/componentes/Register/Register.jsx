import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;      // DEPLOY
    //const API_URL = 'http://localhost:3000';

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, { nombre, apellido, email, password });
            console.log('Registrando usuario:', response.data);
            navigate('/login'); // Redirigir al login después de registrarse
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setError('Error al registrar usuario');
        }
    };
    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="register">
            <h2>Hola, Bienvenido !!</h2>
            <h3>si ya estas registrado</h3>
            <button onClick={handleLoginRedirect} className="login-button">Iniciar Sesión</button>
            <br />
            <h3> registrate </h3>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label></label>
                    <input className="input" type="text" placeholder='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label></label>
                    <input className="input" type="text" placeholder='apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label></label>
                    <input className="input" type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label></label>
                    <input className="input" type="password" placeholder='contraseña' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="registrarse">registrarse</button>
            </form>
        </div>
    );
};

export default Register;





