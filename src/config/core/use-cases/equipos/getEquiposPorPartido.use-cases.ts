import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { headers } from "next/headers";

export const getEquiposPorPartidoUseCases = async (
  fetcherAdapter: HttpAdapter,
  id_local:string, id_visitante:string,
  token: string
): Promise<Equipos[]> => {
  try {

    const partido = {
        id_local,
        id_visitante
    }
    const res = await fetcherAdapter.post("/equipos/equiposPorPartidos", partido,{
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching`);
  }
};
