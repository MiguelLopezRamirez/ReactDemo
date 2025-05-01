// src/ecommerce/services/remote/AddPrice.js
import axios from 'axios';

export const addPrice = async (priceData) => {
    const response = await axios.post(import.meta.env.VITE_REST_API_ECOMMERCE3, priceData); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};
