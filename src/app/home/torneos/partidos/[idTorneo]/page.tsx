'use client'

import BreadCrum from '@/components/BreadCrum'
import ContainerProximosPartidosByTorneo from '@/components/ContainerProximosPartidosByTorneo'
import ContenedorCustom from '@/components/ContenedorCustom'
import FormPartido from '@/components/forms/FormPartido'
import TorneoTablePositioon from '@/components/tables/TorneoTablePositioon'
import { Title } from '@/components/Title'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'
import * as UseCases from '@/config/core/use-cases'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import { EquipoTorneo } from '@/infraestrcuture/entities/torneos'
import { Button, Modal } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'

const PartidosByTorneos = () => {
    const { data: session } = useSession()
    const params = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [partidosByTorneos, setPartidosByTorneos] = useState<Partidos[]>([])
    const [equiposParticipantes, setEquiposParticipantes] = useState<EquipoTorneo[]>([])


    useEffect(() => {
        getPartidosByTorneo()
        getEquiposRegistrados()
    }, [params.idTorneo])


     const getPartidosByTorneo = async () => {
        const res = await UseCases.getPartidosByTorneosUseCases(fetcherDb, params.idTorneo, session?.token);
        setPartidosByTorneos(res);
    }; 

    const handlerModal = () => {
        setOpenModal(!openModal)
    }

    const getEquiposRegistrados = async () => {
        const res = await UseCases.getEquiposRegistrados(fetcherDb, session?.token, params.idTorneo);

        setEquiposParticipantes(res);
    };

    return (
        <ContenedorCustom>
            <div className='flex gap-2 justify-end items-center'>
                <BreadCrum titulo='' url={`/home/torneos/registrar?idTorneo=${params.idTorneo}`} labelBtn='Registrar equipos' />
                <button onClick={handlerModal} className='bg-slate-50 p-2 rounded-md h-max hover:bg-slate-900 hover:text-slate-50 duration-300'>Nuevo partido</button>
            </div>


            <div className='flex flex-col gap-10'>
                <div>
                    <Title content='Proximos partidos' size='text-2xl' />

                    <ContainerProximosPartidosByTorneo partidos={partidosByTorneos} />

                </div>
                <div>
                    <Title content='Tabla Posiciones' size='text-2xl' />
                    <TorneoTablePositioon rows={equiposParticipantes} />

                </div>


                <Modal open={openModal} onClose={handlerModal}>
                    <div className='w-max h-max m-auto translate-y-52 bg-slate-700 p-4 rounded-md '>
                        <FormPartido equiposParticipantes={equiposParticipantes}/>
                    </div>
                </Modal>


            </div>


        </ContenedorCustom>
    )
}

export default PartidosByTorneos