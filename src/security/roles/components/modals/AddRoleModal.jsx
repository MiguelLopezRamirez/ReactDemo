// src/ecommerce/prices/components/modals/AddPriceModal.jsx
import React, {useState, useEffect} from "react";
import {Box, Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Button, IconButton, 
    FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik, FieldArray } from "formik";
import * as Yup from "yup";
import { addRole } from '../../services/remote/post/AddRole';
import { getValuesPrivilegios, getValuesProcesos } from '../../services/remote/get/Getvalues';



import MyAddLabels from "../elements/MyAddLabels"; 

const AddRoleModal = ({ showModal, setShowModal }) => {
    const [procesos, setProcesos] = useState([]);
    const [privilegiosDisponibles, setPrivilegiosDisponibles] = useState([]);
    
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const procesosData = await getValuesProcesos();
                const privilegiosData = await getValuesPrivilegios();
    
                console.log("Procesos recibidos:", procesosData);
                console.log("Privilegios recibidos:", privilegiosData);
    
                setProcesos(procesosData);
                setPrivilegiosDisponibles(privilegiosData);
            } catch (error) {
                console.error("Error al cargar procesos o privilegios", error);
            }
        };
        fetchData();
    }, []);
    
    
    const formik = useFormik({
        initialValues: {
            ROLEID: "",
            ROLENAME: "",
            DESCRIPTION: "",
            PRIVILEGES: [
                {
                    PROCESSID: "",
                    PRIVILEGEID: []
                }
            ],
            DETAIL_ROW: {
                ACTIVED: true,
                DELETED: false,
                DETAIL_ROW_REG: [
                    {
                        CURRENT: true,
                        REGDATE: new Date().toISOString(),
                        REGTIME: "2025-01-25T00:00:00.000Z",
                        REGUSER: "aramis" 
                    }
                ]
            }
        },
        validationSchema: Yup.object({
            ROLEID: Yup.string()
                .required("El ID del rol es requerido")
                .max(20, "El ID no puede exceder 20 caracteres"),
            ROLENAME: Yup.string()
                .required("El nombre del rol es requerido")
                .max(50, "El nombre no puede exceder 50 caracteres"),
            DESCRIPTION: Yup.string()
                .required("La descripción es requerida")
                .max(200, "La descripción no puede exceder 200 caracteres")
        }),
        onSubmit: async (values) => {
            setLoading(true);
        
            // Procesar los PRIVILEGES para añadir el prefijo al PROCESSID si no lo tiene
            const processedPrivileges = values.PRIVILEGES.map(priv => ({
                ...priv,
                PROCESSID: priv.PROCESSID.startsWith("IdProcesses-")
                    ? priv.PROCESSID
                    : `IdProcesses-${priv.PROCESSID}`
            }));
        
            const requestBody = {
                type: "role",
                role: {
                    ...values,
                    PRIVILEGES: processedPrivileges // usar los procesados
                }
            };
        
            console.log("Valores enviados:", requestBody);
        
            try {
                await addRole(requestBody); 
                setShowModal(false); 
                console.log("Rol agregado con éxito:", requestBody);
            } catch (error) {
                console.error("Error al agregar el rol:", error);
            }
        
            setLoading(false);
        },
    });    

    return (
        <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography > {/* Cambiado de h6 a h5 */}
                        <strong>Agregar Nuevo Precio</strong>
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
<TextField
    id="ROLEID"
    label="ID del Rol*"
    required
    value={formik.values.ROLEID}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.ROLEID && Boolean(formik.errors.ROLEID)}
    helperText={formik.touched.ROLEID && formik.errors.ROLEID}
/>

<TextField
    id="ROLENAME"
    label="Nombre del Rol*"
    required
    value={formik.values.ROLENAME}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.ROLENAME && Boolean(formik.errors.ROLENAME)}
    helperText={formik.touched.ROLENAME && formik.errors.ROLENAME}
    inputProps={{
        maxLength: 50
    }}
/>


<TextField
    id="DESCRIPTION"
    label="Descripción*"
    required
    multiline
    rows={4}
    value={formik.values.DESCRIPTION}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.DESCRIPTION && Boolean(formik.errors.DESCRIPTION)}
    helperText={formik.touched.DESCRIPTION && formik.errors.DESCRIPTION}
    inputProps={{
        maxLength: 200
    }}
/>

{/* // Por cada grupo de privilegios (proceso + privilegios) */}
{formik.values.PRIVILEGES.map((priv, index) => (
  <Box key={index} sx={{ mb: 3, border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
    <Typography variant="subtitle1">Permiso #{index + 1}</Typography>

    {/* Select de proceso */}
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id={`process-select-label-${index}`}>Proceso*</InputLabel>
      <Select
        labelId={`process-select-label-${index}`}
        value={priv.PROCESSID}
        onChange={(e) =>
          formik.setFieldValue(`PRIVILEGES[${index}].PROCESSID`, e.target.value)
        }
        required
      >
        {procesos.map((proc) => (
          <MenuItem key={proc.VALUEID} value={proc.VALUEID}>
            {proc.VALUE}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    

    {/* Select múltiple de privilegios */}
    
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id={`privilege-select-label-${index}`}>Privilegios*</InputLabel>
      <Select
        labelId={`privilege-select-label-${index}`}
        multiple
        value={Array.isArray(priv.PRIVILEGEID) ? priv.PRIVILEGEID : []} // Asegura que sea un array
        onChange={(e) =>
            formik.setFieldValue(`PRIVILEGES[${index}].PRIVILEGEID`, e.target.value)
        }
        renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(", ") : ""
          }
        >
        {privilegiosDisponibles.map((privilegio) => (
        <MenuItem key={privilegio.VALUEID} value={privilegio.VALUEID}>
            <Checkbox
            checked={priv.PRIVILEGEID.includes(privilegio.VALUEID)} // ❌ Esto puede fallar si PRIVILEGEID no es array aún
            />
            <ListItemText primary={privilegio.VALUE} />
        </MenuItem>
        ))}

        </Select>
    </FormControl>

    {/* Botón para eliminar este grupo */}
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <IconButton
        color="error"
        onClick={() => {
          const updated = [...formik.values.PRIVILEGES];
          updated.splice(index, 1);
          formik.setFieldValue("PRIVILEGES", updated);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  </Box>
))}

{/* Botón para agregar otro grupo */}
<Button
  variant="outlined"
  onClick={() =>
    formik.setFieldValue("PRIVILEGES", [
      ...formik.values.PRIVILEGES,
      { PROCESSID: "", PRIVILEGEID: [] }
    ])
  }
>
  Agregar Proceso y Privilegios
</Button>
{/* Campo para PRIVILEGES - Requiere un componente más complejo 
<FieldArray
    name="PRIVILEGES"
    render={arrayHelpers => (
        <div>
            {formik.values.PRIVILEGES.map((privilege, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <TextField
                        id={`PRIVILEGES.${index}.PROCESSID`}
                        label={`ID del Proceso ${index + 1}*`}
                        required
                        value={privilege.PROCESSID}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.PRIVILEGES?.[index]?.PROCESSID && Boolean(formik.errors.PRIVILEGES?.[index]?.PROCESSID)}
                        helperText={formik.touched.PRIVILEGES?.[index]?.PROCESSID && formik.errors.PRIVILEGES?.[index]?.PROCESSID}
                    />
                    
                    <FormControl fullWidth error={formik.touched.PRIVILEGES?.[index]?.PRIVILEGEID && Boolean(formik.errors.PRIVILEGES?.[index]?.PRIVILEGEID)}>
                        <InputLabel>Privilegios*</InputLabel>
                        <Select
                            multiple
                            value={privilege.PRIVILEGEID || []}
                            onChange={(e) => {
                                formik.setFieldValue(`PRIVILEGES.${index}.PRIVILEGEID`, e.target.value);
                            }}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {['IdRead', 'IdCreate', 'IdUpdate', 'IdDelete', 'IdAll'].map((priv) => (
                                <MenuItem key={priv} value={priv}>
                                    <Checkbox checked={privilege.PRIVILEGEID?.includes(priv) || false} />
                                    <ListItemText primary={priv} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                            {formik.touched.PRIVILEGES?.[index]?.PRIVILEGEID && formik.errors.PRIVILEGES?.[index]?.PRIVILEGEID}
                        </FormHelperText>
                    </FormControl>

                    <IconButton onClick={() => arrayHelpers.remove(index)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ))}

            <Button 
                variant="outlined" 
                onClick={() => arrayHelpers.push({ PROCESSID: '', PRIVILEGEID: [] })}
            >
                Añadir Privilegio
            </Button>

            {typeof formik.errors.PRIVILEGES === 'string' && (
                <FormHelperText error>{formik.errors.PRIVILEGES}</FormHelperText>
            )}
        </div>
    )}
/>*/}


                    {/* <MyAddLabels
                    label="Agrega Índices de Búsqueda"
                    onChangeLabels={(labels) => (formik.values.Indice = labels.join("-"))}
                    disabled={Loading}
                /> */}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setShowModal(false)}
                    >
                        CERRAR
                    </LoadingButton>
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit" // Cambiar a tipo submit
                        loading={Loading}
                    >
                        GUARDAR
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddRoleModal;
