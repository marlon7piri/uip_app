import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Partidos } from "@/infraestrcuture/entities/partidos";
import { Torneos } from "@/infraestrcuture/entities/torneos";

export const createTorneoUseCases = async (
  fetcherAdapter: HttpAdapter,
  torneo: Torneos,
  token: string
): Promise<Torneos> => {
  try {
    const res = await fetcherAdapter.post<Torneos>("/torneos/create", torneo, {
      headers: {
        token
      },
    });

    return res;
  } catch (error:any) {

    // Si tu adaptador lanza con error.response?.data
    const message =
      error?.response?.data?.message || error.message || "Error desconocido";
    throw new Error(message);
  }
};
