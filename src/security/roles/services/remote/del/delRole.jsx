import axios from "axios";

export function delRole(id) {
    return new Promise((resolve, reject) => {
      axios.post(`${import.meta.env.VITE_REST_API_URL}/delete`, {
        type: "role",
        id: id
      })
      .then((response) => {
        const data = response.data;
        if (!data.success) {
            console.error("No se pudo eliminar el rol:", data.message || "Error desconocido");
            reject(data);
        } else {
            console.log(data.message); // Muestra el mensaje de éxito
            resolve({
                success: true,
                message: data.message,
                roleId: ROLEID // Opcional: puedes incluir el ID eliminado
            });
        }
    })
    .catch((error) => {
        console.error("Error al eliminar el rol:", error);
        reject({
            success: false,
            message: error.response?.data?.message || "Error en la solicitud",
            error: error
        });
    });
  });
};