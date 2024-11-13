// hooks/useEvents.js
import { useReducer, useEffect } from 'react';
import { EventReducer } from '../reducers/EventReducer';
import { saveEventsToLocalStorage, getEventsFromLocalStorage } from '../utils/localStorage';
import { ADD_EVENT, DELETE_EVENT } from '../types/types';

const init = () => {
    return getEventsFromLocalStorage() || [];
};

export const useEvents = () => {
    const [events, dispatch] = useReducer(EventReducer, [], init);

    useEffect(() => {
        saveEventsToLocalStorage(events);
    }, [events]);

    const addEvent = (event) => {
        dispatch({ type: ADD_EVENT, payload: event });
    };

    const deleteEvent = (id) => {
        dispatch({ type: DELETE_EVENT, payload: id });
    };

    const countEvents = () => events.length;

    return {
        events,
        addEvent,
        deleteEvent,
        countEvents,
    };
};
