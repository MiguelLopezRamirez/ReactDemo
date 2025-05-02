import React, { useEffect, useState } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton, darken, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddRoleModel from '../modals/AddRoleModal';
import { useRolesContext } from "../../pages/RolesProvider";
import UpdatePriceModal from "../modals/UpdateRoleModal";
import { showMensajeError, showMensajeConfirm } from "../elements/messages/mySwalAlers";
import { delRole } from "../../services/remote/del/delRole";



const RolesTable = () => {
    const {
        roles,
        roleSel,
        loadingTable,
        idSelectedRowRoles,
        setRoleSel,
        fetchDataRoles,
        setIdSelectedRowRoles,
        showToastExito,
        procesos,
        privilegiosDisponibles,
    } = useRolesContext();

// Definir columnas de la tabla de roles
const RolesColumns = [
    { accessorKey: 'ROLEID', header: 'ID Rol', size: 30 },
    { accessorKey: 'ROLENAME', header: 'Rol', size: 100 },
    { accessorKey: 'DESCRIPTION', header: 'Descripción', size: 100 },
    {
      accessorKey: 'PRIVILEGES', 
      header: 'Procesos y Privilegios', 
      size: 150,
      Cell: ({ row }) => {
        // Generar una lista de procesos y privilegios usando las funciones anteriores
        const processesAndPrivileges = row.original.PRIVILEGES.map((privilege, index) => {
          const processName = getProcessName(privilege.PROCESSID);
          const privilegeNames = getPrivilegeNames(privilege.PRIVILEGEID);
          return (
            <Typography key={index}>
              <strong>{processName}</strong>: {privilegeNames}
            </Typography>
          );
        });
    
        return <Box>{processesAndPrivileges}</Box>;
      },
    },
  ]
    const getProcessName = (processId) => {
          const process = procesos.find((proc) => proc.VALUEID === processId.split("-")[1]);
          return process ? process.VALUE : 'Sin proceso';  // Devuelve el nombre del proceso o "Sin proceso" si no se encuentra
        };
        
        const getPrivilegeNames = (privilegeIds) => {
          const privilegeNames = privilegiosDisponibles
            .filter((priv) => privilegeIds.includes(priv.VALUEID))
            .map((priv) => priv.VALUE);
          return privilegeNames.length > 0 ? privilegeNames.join(', ') : 'Sin privilegios';
        };
        
    const [showAddRoleModel, setShowAddRoleModel] = useState(false); // Estado para el modal
    const [showUpdatePriceModal, setShowUpdatePriceModal] = useState(false); // Estado para el modal
    
    // Método handleReload para recargar manualmente los datos de la tabla
    const handleReload = async () => {
        await fetchDataRoles();
    };

    const handleDelete = async () => {
        const res = await showMensajeConfirm(
          `El rol con el ID ${roleSel.ROLEID} será eliminado, ¿Desea continuar?`
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
        } else {
            showMensajeError(
                `No se pudo Eliminar el Rol ${roleSel.ROLEID}`
              );    
        }
        handleReload();
    };

    return (
        <Box>
            <MaterialReactTable
                columns={RolesColumns}
                data={roles} // Datos de roles obtenidos de la API
                state={{ isLoading: loadingTable }}
                initialState={{ density: "compact", showGlobalFilter: true }}
                muiTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                        setRoleSel(row.original);
                        setIdSelectedRowRoles(row.id);
                    },
                    sx: {
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
                            <IconButton onClick={handleReload}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Actualizar">
                            <IconButton onClick={() => setShowUpdatePriceModal(true)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )}
            />
            {/* Modal para agregar nuevo rol */}
            <AddRoleModel 
                showModal={showAddRoleModel} 
                setShowModal={(open) => {
                    setShowAddRoleModel(open);
                    if (!open) fetchDataRoles(); // Recargar roles si se cierra el modal
                }}
            />
            <UpdatePriceModal 
                showModal={showUpdatePriceModal}
                data={roleSel}
                setShowModal={(open) => {
                    setShowUpdatePriceModal(open);
                    if (!open) fetchDataRoles(); // Recargar roles si se cierra el modal
                }}
            />
        </Box>
    );
};

export default RolesTable;
