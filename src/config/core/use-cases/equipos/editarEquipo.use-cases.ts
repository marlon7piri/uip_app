import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Equipos } from "@/infraestrcuture/entities/equipos";

export const editEquipoUseCases = async (
  fetcherAdapter: HttpAdapter,
  equipo: Equipos,
  idEquipo:string,
  token: string
): Promise<Equipos> => {
  try {
    const res = await fetcherAdapter.put<Equipos>(`/equipos/${idEquipo}`, equipo, {
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error editing teams`);
  }
};
