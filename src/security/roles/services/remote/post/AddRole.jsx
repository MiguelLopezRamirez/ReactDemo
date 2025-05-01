// src/ecommerce/services/remote/AddPrice.js
import axios from 'axios';

export const addRole = async (roleData) => {
    const response = await axios.post(import.meta.env.VITE_REST_API_URL + '/create', roleData); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};
