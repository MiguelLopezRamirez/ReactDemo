import axios from "axios";

export function getAllRoles() {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_REST_API_URL + '/Roles')
            .then((response) => {
                const data = response.data.value;
                if (!Array.isArray(data) || data.length === 0) {
                    console.info("No se encontraron datos de roles");
                    resolve([]);
                } else {
                    // Asegúrate de que estás accediendo a la propiedad 'roles' en el primer objeto de la respuesta
                    console.log("Datos de roles obtenidos:", data);
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("Error en el servicio de roles", error);
                reject(error);
            });
    });
}
