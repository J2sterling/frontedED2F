// components/EventList.js
import React from 'react';
import EventItem from './ItemEvent';
import styles from './styles/EventList.module.scss';

const EventList = ({ events, onDeleteEvent }) => {
    return (
        <ul className={styles.listGroup}>
            {events.map((event) => (
                <EventItem
                    key={event.id}
                    event={event}
                    onDeleteEvent={onDeleteEvent}
                />
            ))}
        </ul>
    );
};

export default EventList;
