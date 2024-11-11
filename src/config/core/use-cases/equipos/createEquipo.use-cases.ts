import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Equipos } from "@/infraestrcuture/entities/equipos";

export const createEquipoUseCases = async (
  fetcherAdapter: HttpAdapter,
  equipo: Equipos,
  token: string
): Promise<Equipos> => {
  try {
    const res = await fetcherAdapter.post<Equipos>("/equipos/create", equipo, {
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error creating teams`);
  }
};
