import { HttpAdapter } from '@/config/adapters/http/httpAdapter'
import { Jugador } from '@/infraestrcuture/entities/ofertas'

export const getJugadorByUserIdUseCases = async (fetcherAdapter: HttpAdapter, id: string,email:string,token:string): Promise<Jugador> => {

    try {

        const jugador = await fetcherAdapter.get<Jugador>(`jugadores/getByUserId/${id}?email=${email}`,{
            headers:{
                token
    }})
        return jugador

    } catch (error) {
        throw new Error("Error obteniendo el jugador" + error)
    }



}

