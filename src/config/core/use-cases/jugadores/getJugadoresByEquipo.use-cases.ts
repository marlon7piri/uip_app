import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Jugadores } from "@/infraestrcuture/entities/jugadores";

export const getJugadoresByEquipoUseCases = async (
  fetcherAdapter: HttpAdapter,
  idEquipo: string,
  token: string
): Promise<Jugadores[]> => {
  try {
    const res = await fetcherAdapter.get<Jugadores>(
      `jugadores/listByEquipo/${idEquipo}`,
      {
        headers: {
          token,
        },
      }
    );
    return res;
  } catch (error) {
    throw new Error(`Error fetching`);
  }
};
