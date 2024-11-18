'use client'

import BreadCrum from '@/components/BreadCrum'
import ContainerProximosPartidos from '@/components/ContainerProximosPartidos'
import ContainerProximosPartidosByTorneo from '@/components/ContainerProximosPartidosByTorneo'
import ContainerTorneos from '@/components/ContainerTorneos'
import ContenedorCustom from '@/components/ContenedorCustom'
import TorneoTablePositioon from '@/components/tables/TorneoTablePositioon'
import { Title } from '@/components/Title'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'
import * as UseCases from '@/config/core/use-cases'
import { Equipos } from '@/infraestrcuture/entities/equipos'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import { Container } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'

const PartidosByTorneos = () => {
    const { data: session } = useSession()
    const params = useParams()
    const [partidosByTorneos, setPartidosByTorneos] = useState<Partidos[]>([])
    const [equiposParticipantes, setEquiposParticipantes] = useState<Equipos[]>([])


    useEffect(() => {
        getPartidosByTorneo()
        getEquiposRegistrados()
    }, [params.idTorneo])

    
    const getPartidosByTorneo = async () => {
        const res = await UseCases.getEquiposRegistradosByTorneosUseCases(fetcherDb, params.idTorneo, session?.token);
        setPartidosByTorneos(res);
    };
    const getEquiposRegistrados = async () => {
        const res = await UseCases.getEquiposRegistrados(fetcherDb, params.idTorneo, session?.token);
        setEquiposParticipantes(res);
    };
console.log(equiposParticipantes)
    return (
        <ContenedorCustom>
            <BreadCrum titulo='Partidos del Torneo' url={`/home/torneos/registrar?idTorneo=${params.idTorneo}`} labelBtn='Registrar equipos' />


            <div className='flex justify-evenly'>
                <div>
                    <ContainerProximosPartidosByTorneo partidos={partidosByTorneos} />

                </div>
                <div>
                    <TorneoTablePositioon rows={equiposParticipantes} />
                </div>
            </div>


        </ContenedorCustom>
    )
}

export default PartidosByTorneos