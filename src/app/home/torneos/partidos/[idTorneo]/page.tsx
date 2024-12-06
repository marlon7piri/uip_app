'use client'

import BreadCrum from '@/components/BreadCrum'
import ContainerProximosPartidosByTorneo from '@/components/ContainerProximosPartidosByTorneo'
import ContenedorCustom from '@/components/ContenedorCustom'
import TorneoTablePositioon from '@/components/tables/TorneoTablePositioon'
import { Title } from '@/components/Title'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'
import * as UseCases from '@/config/core/use-cases'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import { EquipoTorneo } from '@/infraestrcuture/entities/torneos'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'

const PartidosByTorneos = () => {
    const { data: session } = useSession()
    const params = useParams()
    const [partidosByTorneos, setPartidosByTorneos] = useState<Partidos[]>([])
    const [equiposParticipantes, setEquiposParticipantes] = useState<EquipoTorneo[]>([])


    useEffect(() => {
        //getPartidosByTorneo()
        getEquiposRegistrados()
    }, [params.idTorneo])


    /* const getPartidosByTorneo = async () => {
        const res = await UseCases.getPartidosByTorneosUseCases(fetcherDb, params.idTorneo, session?.token);
        setPartidosByTorneos(res);
    }; */

    const getEquiposRegistrados = async () => {
        const res = await UseCases.getEquiposRegistrados(fetcherDb, session?.token, params.idTorneo);

        setEquiposParticipantes(res);
    };

    return (
        <ContenedorCustom>
            <BreadCrum titulo='' url={`/home/torneos/registrar?idTorneo=${params.idTorneo}`} labelBtn='Registrar equipos' />


            <div className='flex flex-col gap-10'>
                <div>
                    <Title content='Proximos partidos' size='text-2xl' />
                    <ContainerProximosPartidosByTorneo partidos={partidosByTorneos} />

                </div>
                <div>
                    <Title content='Tabla Posiciones' size='text-2xl' />
                    <TorneoTablePositioon rows={equiposParticipantes} />
                </div>
            </div>


        </ContenedorCustom>
    )
}

export default PartidosByTorneos