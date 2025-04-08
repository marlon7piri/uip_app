import { HttpAdapter } from '@/config/adapters/http/httpAdapter'
import { Jugador } from '@/infraestrcuture/entities/ofertas'
import axios from 'axios'

export const editJugadorUseCases = async (fetcherAdapter: HttpAdapter, id: string, jugador: Jugador, token: string) => {

    try {
const url = `jugadores/edit/${id}`
        const result = await fetcherAdapter.put(url, jugador, {
            headers: {
                token
            }
        })
        return result

    } catch (error) {
        if(axios.isAxiosError(error)){
            if(error.response){
                console.log(error.response)
                throw new Error("Error editando")
            }
        }
       
    }



}

