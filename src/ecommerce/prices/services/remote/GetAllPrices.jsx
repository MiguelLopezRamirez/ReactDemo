import axios from "axios";

export function getAllPrices() {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_REST_API_ECOMMERCE2)
            .then((response) => {
                const data = response.data;
                if (!Array.isArray(data) || data.length === 0) {
                    console.info("No se encontraron datos de precios");
                    resolve([]);
                } else {
                    // Asegúrate de que estás accediendo a la propiedad 'precios' en el primer objeto de la respuesta
                    const pricesData = data.flatMap(item => item.precios); // Combina todos los arrays de precios
                    console.log("Datos de precios obtenidos:", pricesData);
                    resolve(pricesData);
                }
            })
            .catch((error) => {
                console.error("Error en el servicio de precios", error);
                reject(error);
            });
    });
}
