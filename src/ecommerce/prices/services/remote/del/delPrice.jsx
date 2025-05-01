import axios from "axios";

export function delPrice(id) {
    return new Promise((resolve, reject) => {
      axios.delete(import.meta.env.VITE_REST_API_ECOMMERCE5+id)
        .then((response) => {
          const data = response.data;
         // console.log("getPrIce()", data);
          if (!data.success) {
            console.error("No se pudo realizar correctamente la petición delPrice():", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          } else if (data.data.length === 0) {
            console.info("🛈 No se encontraron elementos para delPrice():");
            resolve([]); 
          } else if (data.success) {
            const precios = data.data[0].dataRes;
            console.log("PRECIOS", precios);
            resolve(JSON.parse(JSON.stringify(precios))); // Resuelve la promesa y hace una copia profunda
          }
        })
        .catch((error) => {
          console.error("Error en delPrice():", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }