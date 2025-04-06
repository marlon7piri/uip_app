import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Torneos } from "@/infraestrcuture/entities/torneos";

export const getTorneosUseCases = async (
  fetcherAdapter: HttpAdapter,
  token: string,
): Promise<Torneos[]> => {
  try {
    const res = await fetcherAdapter.get<Torneos>(`/torneos/list`, {
      headers: {
        token
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching`);
  }
};
