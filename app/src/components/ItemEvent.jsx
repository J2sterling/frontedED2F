
import React from 'react';
import styles from './styles/EventItem.module.scss';

const EventItem = ({ event, onDeleteEvent }) => {
    return (
        <li className={`${styles.listGroupItem} d-flex justify-content-between align-items-center`}>
            <span className={styles.eventText}>{event.description}</span>
            <button
                className={styles.btnDanger}
                onClick={() => onDeleteEvent(event.id)}
            >
                Borrar
            </button>
        </li>
    );
};

export default EventItem;
