// src/ecommerce/services/remote/AddPrice.js
import axios from 'axios';

export const updateRole = async (data) => {
    const response = await axios.post(import.meta.env.VITE_REST_API_URL+'/update',{type:"role", role: data}); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};