import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Torneos } from "@/infraestrcuture/entities/torneos";

export const getEquiposRegistrados = async (
  fetcherAdapter: HttpAdapter,
  token: string,
  idTorneo:string,
): Promise<Torneos[]> => {
  try {
    const res = await fetcherAdapter.get<any>(`/torneos/${idTorneo}`, {
      headers: {
        token
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching`);
  }
};
