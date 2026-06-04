import axios from 'axios';
import { destroyErrors, destroyMessage, setErrorBag, setMessage } from '../error';

const http = axios.create({
    baseURL: '/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': window.location.origin
    }
});

const setCSRFToken = () => {
    return http.get('/sanctum/csrf-cookie');
};

http.interceptors.request.use(
    config => {
        destroyErrors(); // Wis oude fouten voordat een nieuw verzoek wordt uitgevoerd
        destroyMessage(); // Wis oude "messages" voordat een nieuw verzoek wordt uitgevoerd
        if ((config.method === 'post' || config.method === 'put' || config.method === 'delete') && !http.defaults.headers.common['X-CSRF-TOKEN']) {
            return setCSRFToken().then(response => config);
        }
        return config;
    },
    error => Promise.reject(error)
);

http.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 422) {
            setErrorBag(error.response.data.errors); // Sla validatiefouten op in de error bag
            setMessage(error.response.data.message); // Sla de algemene foutmelding op
        }
        return Promise.reject(error);
    }
);

export const getRequest = (endpoint) => http.get(endpoint);
export const postRequest = (endpoint, data) => http.post(endpoint, data);
export const putRequest = (endpoint, data) => http.put(endpoint, data);
export const deleteRequest = (endpoint) => http.delete(endpoint);