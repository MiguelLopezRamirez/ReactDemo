import axios from "axios";

export function getPrice(id) {
    return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_REST_API_ECOMMERCE4+id+'?keyType=BK')
        .then((response) => {
          const data = response.data;
         // console.log("getPrIce()", data);
          if (!data.success) {
            console.error("No se pudo realizar correctamente la petición getPrIce():", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          } else if (data.data.length === 0) {
            console.info("🛈 No se encontraron elementos para getPrIce():");
            resolve([]); 
          } else if (data.success) {
            const precios = data.data[0].dataRes;
            console.log("PRECIOS", precios);
            resolve(JSON.parse(JSON.stringify(precios))); // Resuelve la promesa y hace una copia profunda
          }
        })
        .catch((error) => {
          console.error("Error en getPrIce():", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }