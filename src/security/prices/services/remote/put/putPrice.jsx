// src/ecommerce/services/remote/AddPrice.js
import axios from 'axios';

export const putPrice = async (id,priceData) => {
    const response = await axios.put(import.meta.env.VITE_REST_API_ECOMMERCE3+'/'+id, priceData); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};