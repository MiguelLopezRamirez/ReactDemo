import { createSlice } from '@reduxjs/toolkit';

// Estado inicial adaptado al contexto de Ecommerce
const initialState = {
    // Datos de productos
    productsDataArr: [],

    // Puedes agregar otras propiedades, como el carrito, categorías, etc.
    // cartItems: [],
    // selectedProduct: {},
    // booleans/variables como `isLoading`, `error`, etc.
};

const ecommerceSlice = createSlice({
    name: 'ECOMMERCE',
    initialState,
    reducers: {
        SET_DATA_PRODUCTS: (state, action) => { 			
            console.log('<<REDUX-REDUCER>>:<<SET_DATA_PRODUCTS>>', action.payload);
            // Actualiza el array de productos con los datos proporcionados en la acción
            state.productsDataArr = action.payload;
        },
        // Puedes agregar otros reducers como:
        // ADD_TO_CART: (state, action) => { ... },
        // REMOVE_FROM_CART: (state, action) => { ... },
    }
});

// Exporta las acciones y el reductor
export const {
    SET_DATA_PRODUCTS,
    // ADD_TO_CART,
    // REMOVE_FROM_CART,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;