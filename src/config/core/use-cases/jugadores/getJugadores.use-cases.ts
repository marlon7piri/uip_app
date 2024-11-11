import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Jugadores } from "@/infraestrcuture/entities/jugadores";

export const getJugadoresUseCases = async (
  fetcherAdapter: HttpAdapter,
  token: string
): Promise<Jugadores[]> => {
  try {
    const res = await fetcherAdapter.get<Jugadores>("/jugadores/list", {
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching`);
  }
};
