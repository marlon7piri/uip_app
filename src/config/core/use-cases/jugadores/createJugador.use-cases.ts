import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Jugadores } from "@/infraestrcuture/entities/jugadores";

export const createJugadorUseCases = async (
  fetcherAdapter: HttpAdapter,
  jugador: Jugadores,
  token: string
): Promise<Jugadores> => {
  try {
    const res = await fetcherAdapter.post<Jugadores>(
      "/jugadores/create",
      jugador,
      {
        headers: {
          token,
        },
      }
    );
    return res;
  } catch (error) {
    throw new Error(`Error creating player`);
  }
};
