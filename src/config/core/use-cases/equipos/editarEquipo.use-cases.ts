import axios, { AxiosError } from "axios";

export const editEquipoUseCases = async (
  fetcherAdapter: any,
  equipo: any,
  idEquipo: string,
  token: string,
  autorId: string
) => {
  try {
    const url = `/equipos/${idEquipo}?autorId=${autorId}`;
    const res = await fetcherAdapter.put(url, equipo, {
      headers: { token },
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // ⚡ Si el servidor responde con error, capturamos su mensaje
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
        throw new Error(
          error.response.data.message || "Error desconocido en la API"
        );
      }

      // ⚡ Si el error es de red o Axios no tiene `response`
      console.error("Error de red o sin respuesta:", error.message);
      throw new Error(
        "No se pudo conectar con el servidor. Verifica tu conexión."
      );
    }

    // ⚡ Error inesperado (no es de Axios)
    console.error("Error inesperado:", error);
    throw new Error("Ocurrió un error inesperado");
  }
};
