'use client'

import { getSession } from '@/actions/get-session'
import BreadCrum from '@/components/BreadCrum'

import { fetcherDb } from '@/config/adapters/apiDbAdapter'
import * as UseCases from '@/config/core/use-cases'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import { Torneos } from '@/infraestrcuture/entities/torneos'
import { useParams } from 'next/navigation'
import styles from './styles.module.css'
import '@/components/botonlink.css'

import React, { useEffect, useState } from 'react'
import TabTorneos from './TabTorneos'

const PartidosByTorneos = () => {
    const params = useParams()
    const [openModal, setOpenModal] = useState(false)


    const [partidosByTorneos, setPartidosByTorneos] = useState<Partidos[]>([])
    const [equiposParticipantes, setEquiposParticipantes] = useState<Torneos[]>([])

    const [loading, setLoading] = React.useState(false);



    useEffect(() => {
        const getPartidosByTorneo = async () => {
            setLoading(true)
            const session = await getSession()
            const res = await UseCases.getPartidosByTorneosUseCases(fetcherDb, params?.idTorneo, session?.token);

            setPartidosByTorneos(res)
            setLoading(false)
        };



        const getEquiposRegistrados = async () => {
            setLoading(true)
            const session = await getSession()

            const res = await UseCases.getEquiposRegistrados(fetcherDb, session?.token, params?.idTorneo);

            setEquiposParticipantes(res?.torneo_especifico);

            setLoading(false)
        };
        getPartidosByTorneo()
        getEquiposRegistrados()
    }, [params.idTorneo])



    const handlerModal = () => {
        setOpenModal(!openModal)
    }
    return (
        <div className={styles.container}>
            <div className='w-full flex justify-center items-center flex-col p-4 overflow-auto scrollbar-hide'>
                <div className='flex gap-2 justify-end items-center mt-[100px] mb-4'>
                    <BreadCrum titulo='' url={`/ligas/registrar?idTorneo=${params.idTorneo}`} labelBtn='Registrar equipos' />
                    <BreadCrum titulo='' url={`/ligas/partidos/nuevo?idTorneo=${params.idTorneo}`} labelBtn='Nuevo Partido' />

                </div>
                <TabTorneos partidosByTorneos={partidosByTorneos} loading={loading} />


            </div>
        </div>
    )
}

export default PartidosByTorneos