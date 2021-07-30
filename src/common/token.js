export const getToken = () => {
    return sessionStorage.getItem('token');
};

export const setToken = (TOKEN) => {
    sessionStorage.setItem('token', TOKEN);
};

export const removeToken = () => {
    sessionStorage.removeItem('token');
};
