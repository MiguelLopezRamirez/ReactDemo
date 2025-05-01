// thunks.js
import { getProductsAll } from './actions/productsActions';
import { SET_DATA_PRODUCTS } from './slices/EcommerceSlice';

export const GET_DATA_START = () => {
    return async (dispatch, getState) => {
        try {
            const productsData = await getProductsAll();
            dispatch(SET_DATA_PRODUCTS(productsData)); // Asegúrate de que esta acción se esté ejecutando correctamente
        } catch (error) {
            console.error('Error in GET_DATA_START:', error);
        }
    };
};
