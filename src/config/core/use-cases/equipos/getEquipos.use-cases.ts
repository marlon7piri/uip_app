import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { headers } from "next/headers";

export const getEquiposUseCases = async (
  fetcherAdapter: HttpAdapter,
  token: string,
 
): Promise<Equipos[]> => {
  try {

    const url = `/equipos/list`
    console.log({url})
    const res = await fetcherAdapter.get<Equipos>(url, {
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error fetching`);
  }
};
