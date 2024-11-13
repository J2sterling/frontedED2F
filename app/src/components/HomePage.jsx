// src/components/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventListener from './eventListener';
import styles from './styles/HomePage.module.scss';

const HomePage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [showChat, setShowChat] = useState(false); // Estado para controlar la visibilidad del chat
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            setUsername(user?.name || '');
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUsername('');
        navigate('/');
    };

    const toggleChat = () => {
        setShowChat(!showChat); // Alterna el estado de visibilidad del chat
    };

    return (
        <div className={styles.homeContainer}>
            <main className={styles.mainContent}>
                <section className={styles.welcome}>
                    <h2 className={styles.title}>Bienvenido a la Plataforma de Eventos</h2>
                    <p className={styles.subtitle}>Accede a eventos y crea nuevas experiencias.</p>
                </section>

                {isAuthenticated && (
                    <section className={styles.eventList}>
                        <h2>Eventos en Tiempo Real</h2>
                        <p>Aquí podrás ver tus eventos y notificaciones en tiempo real.</p>
                        <div id="events-container">
                            <EventListener showChat={showChat} /> {/* Pasa el estado `showChat` */}
                        </div>
                    </section>
                )}
                
                <button onClick={toggleChat} className={styles.chatToggleButton}>
                    {showChat ? 'Cerrar Chat' : 'Abrir Chat'}
                </button>
            </main>

            <footer className={styles.footer}>
                <p>&copy; 2024 Plataforma de Eventos. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default HomePage;
