// src/ecommerce/prices/components/PricesTable.jsx
import React, { useEffect, useState } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddRoleModel from '../modals/AddRoleModal';
import { useRolesContext } from "../../pages/RolesProvider";
import UpdatePriceModal from "../modals/UpdatePriceModal"
import { showMensajeError, showMensajeConfirm } from "../elements/messages/mySwalAlers";
import { delRole } from "../../services/remote/del/delRole";
// Definir columnas de la tabla de precios
const RolesColumns = [
  { accessorKey: 'ROLEID', header: 'ID Rol', size: 30 },
  { accessorKey: 'ROLENAME', header: 'Rol', size: 100 },
  { accessorKey: 'DESCRIPTION', header: 'Descripción', size: 100 }
];

const RolesTable = () => {
    const {
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
        showToastExito,
    } = useRolesContext();

    const [showAddRoleModel, setShowAddRoleModel] = useState(false); // Estado para el modal
    const [showUpdatePriceModal, setShowUpdatePriceModal] = useState(false); // Estado para el modal
    
    // Método handleReload para recargar manualmente los datos de la tabla
    const handleReload = async () => {
        await fetchDataRoles();
    };

    const handleDelete = async () => {
        const res = await showMensajeConfirm(
          `El rol con el ID ${roleSel.IdPresentaOK} será eliminado, ¿Desea continuar?`
        );
        if (res) {
          try {
            await delRole(roleSel.ROLEID);
            setRoleSel(null);
            fetchDataRoles();
            showToastExito("Se eliminó el Rol");
            handleReload();
          } catch (e) {
            
          }
        }else{
            showMensajeError(
                `No se pudo Eliminar el Rol ${roleSel.ROLEID} `
              );    
        }
        handleReload();
      };

    return (
        <Box>
            <MaterialReactTable
                columns={RolesColumns}
                data={roles} // Datos de precios obtenidos de la API
                state={{ isLoading: loadingTable }}
                initialState={{ density: "compact", showGlobalFilter: true }}
                muiTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                        console.log("ROW", row.original, "ID", row.id);
                        setRoleSel(row.original);
                        setIdSelectedRowRoles(row.id);
                      },
                      sx: {
                        //FIC: si esta cargando no debes dar click aun
                        cursor: loadingTable ? "not-allowed" : "pointer", 
                        backgroundColor:
                          idSelectedRowRoles === row.id
                            ? darken("#EFF999", 0.01)
                            : "inherit",
                      },
                })}
                renderTopToolbarCustomActions={() => (
                    <Stack direction="row" sx={{ m: 1 }}>
                        <Tooltip title="Agregar">
                            <IconButton onClick={() => setShowAddRoleModel(true)}>
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Recargar">
                            <IconButton onClick={handleReload}> {/* Usa handleReload para recargar */}
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Actualizar">
                            <IconButton onClick={() => setShowUpdatePriceModal(true)}> {/* Usa handleReload para recargar */}
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton onClick={handleDelete}> {/* Usa handleReload para recargar */}
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )}
            />
            {/* Modal para agregar nuevo precio */}
            <AddRoleModel 
                showModal={showAddRoleModel} 
                setShowModal={(open) => {
                    setShowAddRoleModel(open);
                    if (!open) fetchDataRoles(); // Recargar precios si se cierra el modal
                }}
            />
            <UpdatePriceModal 
                showModal={showUpdatePriceModal}
                data = {roleSel}
                setShowModal={(open) => {
                    setShowUpdatePriceModal(open);
                    if (!open) fetchDataRoles(); // Recargar precios si se cierra el modal
                }
                }
                
            />
        </Box>
    );
};

export default RolesTable;
