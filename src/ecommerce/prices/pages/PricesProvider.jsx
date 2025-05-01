// src/ecommerce/prices/pages/PricesProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllPrices } from '../services/remote/GetAllPrices';
import { getPrice } from "../services/remote/get/getPrice";
import { TOAST_EXITO } from "../components/elements/messages/myToastAlerts";

const PricesContext = createContext();

export const PricesProvider = ({ children }) => {
    const [prices, setPrices] = useState([]); // Estado de lista de precios
    const [loadingTable, setLoadingTable] = useState(false); // Estado de carga
       //Precio Seleccionado
       const [priceSel, setPriceSel] = useState(null);
       //Presentación Seleccionada
       const [presentationSel, setPresentationSel] = useState(null);
       //Id de fila seleccionada por precio
       const [idSelectedRowPrices, setIdSelectedRowPrices] = useState(null);
       //Id de fila seleccionada por precio
     const [idSelectedRowPresentation, setIdSelectedRowPresentation] = useState(null);
     //mensaje
     const showToastExito = (mensaje) => TOAST_EXITO(mensaje);
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

    const fetchDataPriceSelect = async (id) => {
        setLoadingTable(true);
        try {
          let priceSel = await getPrice(id);
          setPriceSel(priceSel);
        } catch (error) {
          console.error(
            `Error al obtener la presentacion del producto ${id}`,
            error
          );
        }
        setLoadingTable(false);
      };

    useEffect(() => {
        fetchDataPrices(); // Carga inicial de precios
    }, []);
    const contextValue = {
        prices,
        priceSel,
        loadingTable,
        idSelectedRowPrices,
        idSelectedRowPresentation,
        presentationSel,
        setPriceSel,
        fetchDataPrices,
        fetchDataPriceSelect,
        setIdSelectedRowPrices,
        setIdSelectedRowPresentation,
        setPresentationSel,
        // fetchPresentationSelect,
        showToastExito,
      };
    // Valores compartidos en el contexto
    return (
        <PricesContext.Provider value={contextValue}>
            {children}
        </PricesContext.Provider>
    );
};

// Hook personalizado para usar el contexto de precios
export const usePricesContext = () => useContext(PricesContext);
