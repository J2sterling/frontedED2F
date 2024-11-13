// src/components/EventPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import styles from './styles/EventPage.module.scss';

const socket = io('http://localhost:4000'); // Conectar al servidor de Socket.IO

const EventPage = () => {
    const { eventId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Unirse a la sala del evento específico
        socket.emit('joinEvent', eventId);

        socket.on('newComment', (data) => {
            setComments((prevComments) => [...prevComments, data.comment]);
        });

        return () => {
            socket.emit('leaveEvent', eventId);
            socket.off('newComment');
        };
    }, [eventId]);

    const handleAddComment = () => {
        socket.emit('addComment', { event: eventId, content: newComment });
        setNewComment('');
    };

    return (
        <div className={styles.eventPageContainer}>
            <h1 className={styles.title}>Comentarios para el Evento {eventId}</h1>
            <div className={styles.commentsSection}>
                {comments.map((comment, index) => (
                    <p key={index} className={styles.comment}>{comment.content}</p>
                ))}
            </div>
            <div className={styles.commentInput}>
                <input
                    type="text"
                    placeholder="Escribe un comentario"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleAddComment} className={styles.button}>Enviar Comentario</button>
            </div>
        </div>
    );
};

export default EventPage;
