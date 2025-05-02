import axios from "axios";

export function getValuesPrivilegios() {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_REST_API_URL_VALUES + '/getAllLabels?type=2')
        .then((response) => {
          const data = response.data.value;
          if (!Array.isArray(data) || data.length === 0) {
              console.info("No se encontraron datos de privilegios");
              resolve([]);
          } else {
            let privilegios =data.filter(valor => (valor.LABELID === "IdPrivileges"))
            console.log("Datos de privilegios obtenidos:", privilegios);
                    resolve(privilegios);
          }
        })
        .catch((error) => {
          console.error("Error en getValuesPrivilegios():", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }

  export function getValuesProcesos() {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_REST_API_URL_VALUES + '/getAllLabels?type=2')
        .then((response) => {
          const data = response.data.value;
          if (!Array.isArray(data) || data.length === 0) {
              console.info("No se encontraron datos de procesos");
              resolve([]);
          } else {
            let procesos =data.filter(valor => (valor.LABELID === "IdProcesses"))
            console.log("Datos de procesos obtenidos:", procesos);
                    resolve(procesos);
          }
        })
        .catch((error) => {
          console.error("Error en getValuesProcesos():", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }