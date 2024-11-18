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
        token,
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error creating torneo`);
  }
};
