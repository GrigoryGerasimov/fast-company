export const getFromStorage = key => localStorage[key] && JSON.parse(localStorage.getItem(key));
