// reducers/EventReducer.js
import { ADD_EVENT, DELETE_EVENT } from '../types/types';

export const EventReducer = (state, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return [...state, action.payload];
        case DELETE_EVENT:
            return state.filter(event => event.id !== action.payload);
        default:
            return state;
    }
};
