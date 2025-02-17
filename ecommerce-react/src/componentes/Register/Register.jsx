import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Register.css';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
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

    return (
        <div className="register">
            <h3>ya esta registrado ?</h3>
            <Link to="/login"> loguearse </Link>
            <h2>Registro de Usuarios</h2>
            <form onSubmit={handleRegister}>
            <div className="form-group">
                    <label>Nombre:</label>
                    <input className ="input" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Apellido:</label>
                    <input className ="input" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input className ="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input className ="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className='registrarse'>Registrarse</button>
            </form>
        </div>
    );
};

export default Register;





