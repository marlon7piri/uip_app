import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { Partidos } from "@/infraestrcuture/entities/partidos";

export const createRegistroTorneoUseCases = async (
  fetcherAdapter: HttpAdapter,
  equipos: Equipos,
  token: string
): Promise<Equipos> => {
  try {
    const res = await fetcherAdapter.post<Equipos>(
      "/torneos/registrarEquipos",
      equipos,
      {
        headers: {
          token,
        },
      }
    );
    return res;
  } catch (error) {
    throw new Error(`Error creating registers`);
  }
};
