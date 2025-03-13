import { HttpAdapter } from '@/config/adapters/http/httpAdapter'
import { Jugador } from '@/infraestrcuture/entities/ofertas'

export const getJugadorByIdUseCases = async (fetcherAdapter: HttpAdapter, id: string,token:string): Promise<Jugador> => {

    try {

        const jugador = await fetcherAdapter.get<Jugador>(`jugadores/getById/${id}`,{
            headers:{
                token
    }})
        return jugador

    } catch (error) {
        throw new Error("Error obteniendo el jugador" + error)
    }



}

