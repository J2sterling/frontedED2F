import React, { useState } from 'react';
import styles from './styles/CreateEvent.module.scss';

const CreateEventPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleCreateEvent = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            alert("Token no encontrado. Por favor inicia sesión de nuevo.");
            return;
        }
        const response = await fetch('http://localhost:4000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, date, location })
        });
    
        // Comprobar el estado de la respuesta
        if (response.ok) {
            const data = await response.json();
            alert('Evento creado exitosamente');
        } else {
            const errorData = await response.json();
            console.error('Error al crear evento:', errorData.message || 'Error desconocido');
            alert('Error al crear el evento: ' + (errorData.message || 'Error desconocido'));
        }
    };
    
    return (
        <div className={styles.createEventContainer}>
            <h1 className={styles.title}>Crear Evento</h1>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
            />
            <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Ubicación"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
            />
            <button onClick={handleCreateEvent} className={styles.button}>Crear Evento</button>
        </div>
    );
};

export default CreateEventPage;
