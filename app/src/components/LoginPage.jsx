import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/LoginPage.module.scss';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Guarda el token y el nombre de usuario en el localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ name: data.user.name })); // Aquí asegúrate de que `data.user.name` esté presente en la respuesta del backend
                navigate('/');
            } else {
                setErrorMessage(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            setErrorMessage('Error al conectar con el servidor');
        }
    };
    

    return (
        <div className={styles.loginContainer}>
            <h1>Iniciar Sesión</h1>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />
            <button onClick={handleLogin} className={styles.button}>Ingresar</button>
        </div>
    );
};

export default LoginPage;
