import { TypeResultado } from "@/components/hooks/usePartidos";
import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Partidos } from "@/infraestrcuture/entities/partidos";

export const evaluarPartidoUseCases = async (
  fetcherAdapter: HttpAdapter,
  result: TypeResultado,
  token: string
): Promise<Partidos> => {
  try {
    const res = await fetcherAdapter.post<TypeResultado>(
      "/matcher/evaluar",
      result,
      {
        headers: {
          token
        },
      }
    );
    return res;
  } catch (error) {
    throw new Error(`Error creating matcher`);
  }
};
