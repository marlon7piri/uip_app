import { HttpAdapter } from '@/config/adapters/http/httpAdapter'
import { Jugador } from '@/infraestrcuture/entities/ofertas'

export const editJugadorByUserIdUseCases = async (fetcherAdapter: HttpAdapter, userId: string,data:any,token:string): Promise<Jugador> => {

    try {

        const jugador = await fetcherAdapter.put<Jugador>(`jugadores/editByUserId/${userId}`,data,{
            headers:{
                token
    }})
        return jugador

    } catch (error) {
        throw new Error("Error editando el jugador" + error)
    }



}

