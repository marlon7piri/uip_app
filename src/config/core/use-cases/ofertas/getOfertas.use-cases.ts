import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Ofertas } from "@/infraestrcuture/entities/ofertas";

export const getOfertasUseCases = async (
  fetcherAdapter: HttpAdapter,
  token: string
): Promise<Ofertas[]> => {
  try {
    const res = await fetcherAdapter.get<Ofertas>("/ofertas/list", {
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching`);
  }
};
