import { HttpAdapter } from '@/config/adapters/http/httpAdapter'
import { Jugador } from '@/infraestrcuture/entities/ofertas'

export const editJugadorUseCases = async (fetcherAdapter: HttpAdapter, id: string, jugador: Jugador, token: string): Promise<Jugador> => {

    try {

        const result = await fetcherAdapter.put<Jugador>(`jugadores/edit/${id}`, jugador, {
            headers: {
                token
            }
        })
        return result

    } catch (error) {
        throw new Error("Error obteniendo el jugador" + error)
    }



}

