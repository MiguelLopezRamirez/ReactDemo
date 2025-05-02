// src/ecommerce/prices/components/modals/UpdateRoleModal.jsx
import React, { useState, useEffect } from "react";
import {
  Box, Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions,
  Button, IconButton, FormControl, InputLabel, Select, MenuItem, Checkbox,
  ListItemText
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from "formik";
import * as Yup from "yup";
import { getValuesPrivilegios, getValuesProcesos } from '../../services/remote/get/Getvalues';
import { updateRole } from "../../services/remote/put/PutRole"; // Asegúrate de tener este servicio

const UpdateRoleModal = ({ showModal, setShowModal, data }) => {
  const [procesos, setProcesos] = useState([]);
  const [privilegiosDisponibles, setPrivilegiosDisponibles] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const procesosData = await getValuesProcesos();
        const privilegiosData = await getValuesPrivilegios();
        setProcesos(procesosData);
        setPrivilegiosDisponibles(privilegiosData);
      } catch (error) {
        console.error("Error al cargar procesos o privilegios", error);
      }
    };
    fetchData();
  }, []);
  const processedPrivileges = data.PRIVILEGES.map(({ _id, ...priv }) => ({
    ...priv,
    PROCESSID: priv.PROCESSID.startsWith("IdProcesses-")
      ? priv.PROCESSID
      : `IdProcesses-${priv.PROCESSID}`
  }));
  
  const processedInitialValues = data
  ? {
      ...data,
      PRIVILEGES: data.PRIVILEGES.map(({ _id, ...priv }) => ({
        ...priv,
        PROCESSID: priv.PROCESSID.replace("IdProcesses-", "")
      }))
            
    }
  : {
      ROLEID: "",
      ROLENAME: "",
      DESCRIPTION: "",
      PRIVILEGES: [],
      DETAIL_ROW: {
        ACTIVED: true,
        DELETED: false,
        DETAIL_ROW_REG: [{
          CURRENT: true,
          REGDATE: new Date().toISOString(),
          REGTIME: new Date().toISOString(),
          REGUSER: "Aramis",
        }],
      },
    };


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: processedInitialValues,
    
    validationSchema: Yup.object({
      ROLEID: Yup.string().required("El ID del rol es requerido").max(20),
      ROLENAME: Yup.string().required("El nombre del rol es requerido").max(50),
      DESCRIPTION: Yup.string().required("La descripción es requerida").max(200)
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const processedPrivileges = values.PRIVILEGES.map(priv => ({
        ...priv,
        PROCESSID: priv.PROCESSID.startsWith("IdProcesses-")
          ? priv.PROCESSID
          : `IdProcesses-${priv.PROCESSID}`
      }));

      const requestBody = {
        ROLEID: values.ROLEID,
        ROLENAME: values.ROLENAME,
        DESCRIPTION: values.DESCRIPTION,
        DETAIL_ROW: {
        ACTIVED: true,
        DELETED: false,
        DETAIL_ROW_REG: [{
            CURRENT: true,
            REGDATE: new Date().toISOString(),
            REGTIME: new Date().toISOString(),
            REGUSER: "Aramis",
        }],
        },
        PRIVILEGES: processedPrivileges,
      };

      try {
        console.log(JSON.stringify(requestBody, null, 2))
        await updateRole( requestBody);
        setShowModal(false);
        console.log("Rol actualizado con éxito:", requestBody);
      } catch (error) {
        console.error("Error al actualizar el rol:", error);
      }

      setLoading(false);
    }
  });
  if (!data?.ROLEID) return <div>Cargando datos del rol...</div>;
  return (
    <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography><strong>Actualizar Rol</strong></Typography>
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
          <TextField
            id="ROLEID"
            label="ID del Rol*"
            required
            disabled // No se permite editar el ID
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
            inputProps={{ maxLength: 50 }}
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
            inputProps={{ maxLength: 200 }}
          />

          {formik.values.PRIVILEGES.map((priv, index) => (
            <Box key={index} sx={{ mb: 3, border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1">Permiso #{index + 1}</Typography>

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

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id={`privilege-select-label-${index}`}>Privilegios*</InputLabel>
                <Select
                  labelId={`privilege-select-label-${index}`}
                  multiple
                  value={Array.isArray(priv.PRIVILEGEID) ? priv.PRIVILEGEID : []}
                  onChange={(e) =>
                    formik.setFieldValue(`PRIVILEGES[${index}].PRIVILEGEID`, e.target.value)
                  }
                  renderValue={(selected) =>
                    Array.isArray(selected) ? selected.join(", ") : ""
                  }
                >
                  {privilegiosDisponibles.map((privilegio) => (
                    <MenuItem key={privilegio.VALUEID} value={privilegio.VALUEID}>
                      <Checkbox checked={priv.PRIVILEGEID.includes(privilegio.VALUEID)} />
                      <ListItemText primary={privilegio.VALUE} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
            type="submit"
            loading={Loading}
          >
            ACTUALIZAR
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateRoleModal;
