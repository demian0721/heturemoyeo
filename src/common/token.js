export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (TOKEN) => {
    localStorage.setItem('token', TOKEN);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};
