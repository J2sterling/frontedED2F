// src/components/EventListener.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Conexión al backend
const socket = io('http://localhost:4000'); // Cambia la URL según sea necesario

const EventListener = ({ showChat }) => { // Añadimos la propiedad `showChat`
    const [events, setEvents] = useState([]);
    const [comments, setComments] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Escuchar el evento de nuevo evento
        socket.on('newEvent', (data) => {
            console.log('Nuevo evento recibido:', data);
            setEvents((prevEvents) => [...prevEvents, data.event]);
        });

        // Escuchar el evento de nuevo comentario
        socket.on('newComment', (data) => {
            console.log('Nuevo comentario recibido:', data);
            setComments((prevComments) => [...prevComments, data.comment]);
        });

        // Escuchar los mensajes de chat
        socket.on('chatMessage', (data) => {
            setChatMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            // Limpiar los eventos al desmontar el componente
            socket.off('newEvent');
            socket.off('newComment');
            socket.off('chatMessage');
        };
    }, []);

    // Función para enviar un mensaje de chat
    const sendMessage = () => {
        const messageData = {
            eventId: 'someEventId', // Cambia esto por el ID del evento actual
            content: newMessage,
        };
        // Emitir el mensaje al servidor
        socket.emit('chatMessage', messageData);

        // Mostrar inmediatamente el mensaje en la interfaz
        setChatMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage(''); // Limpiar el campo de entrada
    };

    return (
        <div>
            <h2>Eventos en Tiempo Real</h2>

            {/* Mostrar eventos recibidos */}
            <div>
                <h3>Nuevos Eventos</h3>
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event._id}>
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No tienes eventos. ¡Crea uno para comenzar!</p>
                )}
            </div>

            {/* Mostrar comentarios recibidos */}
            <div>
                <h3>Comentarios Recientes</h3>
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>

            {/* Condición para mostrar el chat */}
            {showChat && (
                <div>
                    <h3>Chat</h3>
                    <div>
                        {chatMessages.map((msg, index) => (
                            <p key={index}>{msg.content}</p>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje"
                    />
                    <button onClick={sendMessage}>Enviar</button>
                </div>
            )}
        </div>
    );
};

export default EventListener;
