
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Necesitas axios para hacer la petición al backend
import './Login.css';

const API_URL = import.meta.env.VITE_API_URL;      // DEPLOY
//const API_URL = 'http://localhost:3000';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Para mostrar mensajes de error
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar cualquier error anterior
        try {
            // 1. Hacer la petición al backend (reemplaza con la URL correcta)
            const response = await axios.post(`${API_URL}/api/auth/login`, {  //DEBE SER LA URL DE TU BACK
                email: email,
                password: password
            });
            // 2. Si el inicio de sesión es exitoso:
            if (response.status === 200) {
                const token = response.data.token;  // Suponiendo que el backend devuelve { token: '...' }
                const userData = response.data.userData; // Suponiendo que el backend devuelve { userData: { ... } }
                // 3. Guardar el token en localStorage (o sessionStorage)
                localStorage.setItem('token', token);
                localStorage.setItem('userData', JSON.stringify(userData)); // Guarda la información del usuario (opcional)
                // 4. Redirigir al usuario a la página de checkout (o a donde quieras)
                navigate('/checkout');
            } else {
                // Si el backend devuelve un código de error inesperado
                setError('Error al iniciar sesión. Inténtalo de nuevo.');
            }
        } catch (error) {
            // 5. Manejar errores (credenciales inválidas, error de conexión, etc.)
            console.error('Error al iniciar sesión:', error);
            if (error.response && error.response.status === 401) {
                setError('Credenciales inválidas. Verifica tu email y contraseña.');
            } else {
                setError('Error al iniciar sesión. Inténtalo de nuevo.'); // Error genérico
            }
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>} {/* Mostrar mensajes de error */}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="registrarse">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default Login;


/*  actual
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para autenticar al usuario
        console.log('Autenticando usuario:', email, password);
        navigate('/checkout'); // Redirigir al checkout después de iniciar sesión
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input className ="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input className ="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="registrarse">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;  */

