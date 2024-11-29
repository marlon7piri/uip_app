import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Equipos } from "@/infraestrcuture/entities/equipos";

export const getEquiposRegistrados = async (
  fetcherAdapter: HttpAdapter,
  idTorneo:string,
  token: string
): Promise<any[]> => {
  try {
    const res = await fetcherAdapter.get<any>(`/torneos/equiposRegistrados/${idTorneo}`, {
      headers: {
        token
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching`);
  }
};
