import { HttpAdapter } from "@/config/adapters/http/httpAdapter"
import { Jugador } from "@/infraestrcuture/entities/ofertas"

export const eliminarJugadorUseCases = async (fetcherAdapter: HttpAdapter, id: string, token: string): Promise<Jugador> => {

    try {
        const res = await fetcherAdapter.delete<Jugador>(`/jugadores/delete/${id}`, {
            headers: {
                token
            }
        })
        return res

    } catch (error) {
        throw new Error("Error del server" + error)
    }
}

