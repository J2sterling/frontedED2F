// utils/localStorageUtils.js
export const saveEventsToLocalStorage = (events) => {
    localStorage.setItem('events', JSON.stringify(events));
};

export const getEventsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('events'));
};
