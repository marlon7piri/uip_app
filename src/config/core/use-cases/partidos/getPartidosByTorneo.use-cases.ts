import { HttpAdapter } from "@/config/adapters/http/httpAdapter";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { Partidos } from "@/infraestrcuture/entities/partidos";

export const getEquiposRegistradosByTorneosUseCases = async (
    fetcherAdapter: HttpAdapter,
    idTorneo: string,
    token: string
): Promise<Equipos[]> => {
    try {
        const res = await fetcherAdapter.get<Equipos>(`torneos/equiposRegistrados/${idTorneo}`, {
            headers: {
                token,
            },
        });
        return res;
    } catch (error) {
        throw new Error(`Error fetching teams by tournament`);
    }
};
