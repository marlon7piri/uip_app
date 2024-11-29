'use client'
import ContenedorCustom from '@/components/ContenedorCustom'
import FormResultadoPartidos from '@/components/forms/FormResultadoPartidos'
import { useJugador } from '@/components/hooks/useJugador'
import { Title } from '@/components/Title'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


interface ResultadoType {
    ganador_id: string
    perdedor_id: string
    goles: number
    asistencias: number
    is_draw: boolean
    goleadores: string[]
}

const EditPartido = () => {
    const search = useSearchParams()
    const idTorneo = search.get('idTorneo')
    const local = search.get('idLocal')
    const visitante = search.get('idVisitante')
    const { getJugadoresByEquipos } = useJugador()
    const [jugadoresVisitantes, setJugadoresVisitantes] = useState([])
    const [jugadoresLocales, setJugadoresLocales] = useState([])



    useEffect(() => {
        const loadJugadores = async () => {
            const dataLocal = await getJugadoresByEquipos(local)
            const dataVisitante = await getJugadoresByEquipos(visitante)
            console.log(dataLocal?.jugadores)

            setJugadoresLocales(dataLocal?.jugadores)
            setJugadoresVisitantes(dataVisitante?.jugadores)

        }

        loadJugadores()
        console.log(jugadoresLocales)

    }, [])

    return (
        <ContenedorCustom>

            <Title content='Modificar resultado' size='text-4xl' />
            <FormResultadoPartidos />
        </ContenedorCustom>
    )
}

export default EditPartido