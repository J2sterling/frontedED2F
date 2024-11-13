import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/RegisterPage.module.scss';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        setErrorMessage(''); // Reinicia el mensaje de error antes de la solicitud

        try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                navigate('/login'); // Redirige si el registro fue exitoso
            } else {
                setErrorMessage(data.message); // Muestra el mensaje de error
            }
        } catch (error) {
            setErrorMessage('Error en el servidor. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h1>Registrarse</h1>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Muestra el mensaje de error */}
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
            />
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
            <button onClick={handleRegister} className={styles.button}>Registrarse</button>
        </div>
    );
};

export default RegisterPage;