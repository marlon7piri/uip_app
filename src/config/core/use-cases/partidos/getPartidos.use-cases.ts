import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Partidos } from "@/infraestrcuture/entities/partidos";

export const getPartidosUseCases = async (
  fetcherAdapter: HttpAdapter,
  token: string
): Promise<Partidos[]> => {
  try {
    const res = await fetcherAdapter.get<Partidos>("/matcher/list", {
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching`);
  }
};
