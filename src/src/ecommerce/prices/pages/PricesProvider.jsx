// src/ecommerce/prices/pages/PricesProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllPrices } from '../services/remote/GetAllPrices';

const PricesContext = createContext();

export const PricesProvider = ({ children }) => {
    const [prices, setPrices] = useState([]); // Estado de lista de precios
    const [loadingTable, setLoadingTable] = useState(false); // Estado de carga

    // Función para cargar los precios
    const fetchDataPrices = async () => {
        setLoadingTable(true);
        try {
            const allPrices = await getAllPrices();
            setPrices(allPrices);
        } catch (error) {
            console.error("Error al obtener los precios:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchDataPrices(); // Carga inicial de precios
    }, []);

    // Valores compartidos en el contexto
    return (
        <PricesContext.Provider value={{ prices, loadingTable, fetchDataPrices }}>
            {children}
        </PricesContext.Provider>
    );
};

// Hook personalizado para usar el contexto de precios
export const usePricesContext = () => useContext(PricesContext);
