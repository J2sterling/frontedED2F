// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Comprueba si el token está en el localStorage para verificar la autenticación
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            setUsername(user?.name || '');
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        // Elimina token y detalles de usuario del localStorage para cerrar sesión
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUsername('');
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <header>
            <h1>Plataforma de Eventos</h1>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/create-event">Crear Evento</Link></li>
                            <li><Link to="/events">Eventos</Link></li>
                            <li><Link to="/profile">Perfil</Link></li>
                            <li>
                                <button onClick={handleLogout}>Cerrar Sesión</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/register">Registrarse</Link></li>
                            <li><Link to="/login">Iniciar Sesión</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
