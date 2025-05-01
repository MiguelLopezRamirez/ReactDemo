// src/ecommerce/prices/components/PricesTable.jsx
import React, { useEffect, useState } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getAllPrices } from '../../services/remote/GetAllPrices'; // Importa el servicio de precios
import AddPriceModal from '../modals/AddPriceModal';

// Definir columnas de la tabla de precios
const PricesColumns = [
  { accessorKey: 'IdPresentaOK', header: 'ID Producto', size: 30 },
  { accessorKey: 'Precio', header: 'Precio', size: 100 },
  { accessorKey: 'CostoIni', header: 'Costo Inicial', size: 100 },
  { accessorKey: 'CostoFin', header: 'Costo Final', size: 100 },
  { accessorKey: 'IdTipoFormulaOK', header: 'Tipo de Fórmula', size: 150 },
];

const PricesTable = () => {
    // Estado para almacenar los datos de precios
    const [prices, setPrices] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true); // Estado de carga para la tabla
    const [showAddPriceModal, setShowAddPriceModal] = useState(false); // Estado para el modal

    // Método para cargar datos de precios desde la API y actualizar el estado
    const fetchDataPrices = async () => {
        setLoadingTable(true);
        try {
            const allPricesData = await getAllPrices(); // Llama al servicio para obtener los precios
            setPrices(allPricesData); // Actualiza el estado con los precios obtenidos
        } catch (error) {
            console.error("Error al obtener los datos de precios:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    // Llama a fetchDataPrices al montar el componente
    useEffect(() => {
        fetchDataPrices();
    }, []);

    // Método handleReload para recargar manualmente los datos de la tabla
    const handleReload = async () => {
        await fetchDataPrices();
    };

    return (
        <Box>
            <MaterialReactTable
                columns={PricesColumns}
                data={prices} // Datos de precios obtenidos de la API
                state={{ isLoading: loadingTable }}
                initialState={{ density: "compact", showGlobalFilter: true }}
                renderTopToolbarCustomActions={() => (
                    <Stack direction="row" sx={{ m: 1 }}>
                        <Tooltip title="Agregar">
                            <IconButton onClick={() => setShowAddPriceModal(true)}>
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Recargar">
                            <IconButton onClick={handleReload}> {/* Usa handleReload para recargar */}
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )}
            />
            {/* Modal para agregar nuevo precio */}
            <AddPriceModal 
                showModal={showAddPriceModal} 
                setShowModal={(open) => {
                    setShowAddPriceModal(open);
                    if (!open) fetchDataPrices(); // Recargar precios si se cierra el modal
                }}
            />
        </Box>
    );
};

export default PricesTable;
