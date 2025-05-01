import { configureStore } from "@reduxjs/toolkit";
import ecommerceSlice from "../slices/EcommerceSlice.js"; // Importa el slice de Ecommerce

// Configura la tienda Redux
const store = configureStore({
    reducer: {
        ecommerceReducer: ecommerceSlice, // Utiliza el reducer de Ecommerce
        // Puedes agregar otros reducers aquí si los necesitas, como carrito, usuarios, etc.
    },
});

export default store;