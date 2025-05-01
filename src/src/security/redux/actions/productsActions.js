import axios from 'axios';

export async function getProductsAll() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios`);
        console.log(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios`);
        console.log('<<AXIOS-PRODUCTOS>>: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Manejar el error de manera adecuada
    }
}
