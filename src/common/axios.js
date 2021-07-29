// LIBRARY
import axios from 'axios';

// FUNCTION
import { getToken } from './token';

const instance = axios.create({
    baseURL: 'http://astraios.shop:4001/',
    headers: {authorization: `Bearer ${getToken()}`},
});

// instance.interceptors.request.use((config) => {
//     config.headers['Content-Type'] = 'application/json; charset=utf-8';
//     config.headers['X-Requested-With'] = 'XMLHttpRequest';
//     config.headers['Accept'] = '*/*';
//     config.headers['authorization'] = `Bearer ${getToken()}`;
//     return config;
// });

export default instance;
