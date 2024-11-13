// src/components/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import styles from './styles/ProfilePage.module.scss';

const ProfilePage = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Obtener los datos del usuario desde el almacenamiento local o hacer una solicitud al backend
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setName(storedUser.name);
            setEmail(storedUser.email);
        }
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setName(user.name);
        setEmail(user.email);
    };

    const handleSave = () => {
        // Actualizar los datos en el almacenamiento local
        const updatedUser = { ...user, name, email };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
        alert('Perfil actualizado con éxito');
    };

    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.title}>Perfil de Usuario</h1>

            {!isEditing ? (
                <div className={styles.infoContainer}>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={handleEdit} className={styles.editButton}>Editar Perfil</button>
                </div>
            ) : (
                <div className={styles.editContainer}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                    <button onClick={handleSave} className={styles.saveButton}>Guardar Cambios</button>
                    <button onClick={handleCancel} className={styles.cancelButton}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
