import { useJugador } from '@/components/hooks/useJugador'
import TorneoTablePositioon from '@/components/tables/TorneoTablePositioon'
import { Title } from '@/components/Title'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import { Torneos } from '@/infraestrcuture/entities/torneos'
import { getSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as UseCases from '@/config/core/use-cases'
import Spinner from '@/components/Spinner'


const TabTablaPosicion = () => {
    const params = useParams()


    const [equiposParticipantes, setEquiposParticipantes] = useState<Torneos[]>([])
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        const getEquiposRegistrados = async () => {
            const session = await getSession()
            setLoading(true)
            const res = await UseCases.getEquiposRegistrados(fetcherDb, session?.token, params.idTorneo);

            setEquiposParticipantes(res.torneo_especifico);
            setLoading(false)

        };
        getEquiposRegistrados()
    }, [params.idTorneo])






    if (!equiposParticipantes) {
        return <h1 className='text-slate-50 text-3xl text-center'>No hay equipos registrados aún</h1>
    }

    return (
        <div className='flex justify-center items-center flex-col'>
            {loading ? <Spinner /> : <div className="pl-20"><TorneoTablePositioon rows={equiposParticipantes} /></div>}
        </div>
    )
}

export default TabTablaPosicion
