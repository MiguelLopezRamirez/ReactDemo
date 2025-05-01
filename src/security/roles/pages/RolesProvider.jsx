import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllRoles } from '../services/remote/GetAllRoles';
import { getRole } from "../services/remote/get/getRole";
import { TOAST_EXITO } from "../components/elements/messages/myToastAlerts";

const RolesContext = createContext();

export const RolesProvider = ({ children }) => {
    const [roles, setRoles] = useState([]); // Estado de lista de precios
    const [loadingTable, setLoadingTable] = useState(false); // Estado de carga
       //Precio Seleccionado
       const [roleSel, setRoleSel] = useState(null);
       //Presentación Seleccionada
       const [presentationSel, setPresentationSel] = useState(null);
       //Id de fila seleccionada por precio
       const [idSelectedRowRoles, setIdSelectedRowRoles] = useState(null);
       //Id de fila seleccionada por precio
     const [idSelectedRowPresentation, setIdSelectedRowPresentation] = useState(null);
     //mensaje
     const showToastExito = (mensaje) => TOAST_EXITO(mensaje);
    // Función para cargar los precios
    const fetchDataRoles = async () => {
        setLoadingTable(true);
        try {
            const allRoles = await getAllRoles();
            setRoles(allRoles);
        } catch (error) {
            console.error("Error al obtener los roles:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    const fetchDataRoleSelect = async (id) => {
        setLoadingTable(true);
        try {
          let roleSel = await getRole(id);
          setRoleSel(roleSel);
        } catch (error) {
          console.error(
            `Error al obtener la presentacion del rol ${id}`,
            error
          );
        }
        setLoadingTable(false);
      };

    useEffect(() => {
        fetchDataRoles(); // Carga inicial de precios
    }, []);
    const contextValue = {
        roles,
        roleSel,
        loadingTable,
        idSelectedRowRoles,
        idSelectedRowPresentation,
        presentationSel,
        setRoleSel,
        fetchDataRoles,
        fetchDataRoleSelect,
        setIdSelectedRowRoles,
        setIdSelectedRowPresentation,
        setPresentationSel,
        // fetchPresentationSelect,
        showToastExito,
      };
    // Valores compartidos en el contexto
    return (
        <RolesContext.Provider value={contextValue}>
            {children}
        </RolesContext.Provider>
    );
};

// Hook personalizado para usar el contexto de precios
export const useRolesContext = () => useContext(RolesContext);
