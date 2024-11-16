import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Partidos } from "@/infraestrcuture/entities/partidos";

export const createPartidoUseCases = async (
  fetcherAdapter: HttpAdapter,
  partido: Partidos,
  token: string
): Promise<Partidos> => {
  try {
    const res = await fetcherAdapter.post<Partidos>(
      "/matcher/create",
      partido,
      {
        headers: {
          token,
        },
      }
    );
    return res;
  } catch (error) {
    throw new Error(`Error creating matcher`);
  }
};
