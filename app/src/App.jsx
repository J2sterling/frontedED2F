// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CreateEventPage from './components/CreateEventPage';
import EventPage from './components/EventPage';
import ProfilePage from './components/ProfilePage'; // Importa el perfil

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/create-event" element={<CreateEventPage />} />
                <Route path="/event/:eventId" element={<EventPage />} />
                <Route path="/profile" element={<ProfilePage />} /> {/* Ruta de perfil */}
            </Routes>
        </>
    );
};

export default App;

