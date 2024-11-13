import React, { useState } from 'react';

const ChatComponent = () => {
    // Estado para controlar la visibilidad del chat
    const [isChatVisible, setIsChatVisible] = useState(false);

    // Función para alternar la visibilidad del chat
    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    return (
        <div>
            {/* Botón para mostrar/ocultar el chat */}
            <button 
                onClick={toggleChatVisibility} 
                style={{ 
                    padding: '10px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer', 
                    marginBottom: '10px' 
                }}
            >
                {isChatVisible ? 'Cerrar Chat' : 'Abrir Chat'}
            </button>

            {/* Mostrar el chat solo si isChatVisible es true */}
            {isChatVisible && (
                <div>
                    <h3>Chat</h3>
                    <textarea 
                        placeholder="Escribe un mensaje" 
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            resize: 'none'
                        }}
                    />
                    <button 
                        style={{
                            backgroundColor: '#4CAF50', 
                            color: 'white', 
                            padding: '10px 15px', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer'
                        }}
                    >
                        Enviar
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
