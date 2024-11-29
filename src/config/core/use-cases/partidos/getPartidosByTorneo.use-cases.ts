import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { Partidos } from "@/infraestrcuture/entities/partidos";

export const getPartidosByTorneosUseCases = async (
  fetcherAdapter: HttpAdapter,
  idTorneo: string,
  token: string
): Promise<Partidos[]> => {
  try {
    const res = await fetcherAdapter.get<Partidos>(
      `torneos/partidosbytorneo/${idTorneo}`,
      {
        headers: {
          token
        },
      }
    );
    return res;
  } catch (error) {
    throw new Error(`Error fetching teams by tournament`);
  }
};
