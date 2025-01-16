'use client'
import { getSession } from '@/actions/get-session'
import ContenedorCustom from '@/components/ContenedorCustom'
import FormResultadoPartidos from '@/components/forms/FormResultadoPartidos'
import { useJugador } from '@/components/hooks/useJugador'
import { usePartidos } from '@/components/hooks/usePartidos'
import { Title } from '@/components/Title'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'
import *  as UseCases from '@/config/core/use-cases'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'






const EditPartido = () => {

    const search = useSearchParams()

    const idTorneo = search.get('idTorneo')
    const local = search.get('idLocal')
    const visitante = search.get('idVisitante')


    const [jugadores, setJugadores] = useState([])



    useEffect(() => {


        getJugadores()

    }, [])


    const getJugadores = async () => {
        const session = await getSession()

        const resLocal = await UseCases.getJugadoresByEquipoUseCases(
            fetcherDb,
            local,
            session?.token
        );
        const resVisitante = await UseCases.getJugadoresByEquipoUseCases(
            fetcherDb,
            visitante,
            session?.token
        );
        setJugadores([...resLocal?.jugadores,...resVisitante?.jugadores])
    }


    return (
        <ContenedorCustom>

            <Title content='Modificar resultado' size='text-4xl' />
            <div className='w-full h-full flex justify-center items-center'>

            <FormResultadoPartidos jugadores={jugadores}/>
            </div>
        </ContenedorCustom>
    )
}

export default EditPartido