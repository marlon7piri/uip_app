'use client'

import { getSession } from '@/actions/get-session'
import BreadCrum from '@/components/BreadCrum'
import ContainerProximosPartidosByTorneo from '@/components/ContainerProximosPartidosByTorneo'
import ContenedorCustom from '@/components/ContenedorCustom'
import FormPartido from '@/components/forms/FormPartido'
import { useJugador } from '@/components/hooks/useJugador'
import { useSessionAuth } from '@/components/hooks/useSessionAuth'
import MercadoTable from '@/components/tables/MercadoTable'
import TorneoTableGoleadores from '@/components/tables/TorneoTableGoleadores'
import TorneoTablePositioon from '@/components/tables/TorneoTablePositioon'
import { Title } from '@/components/Title'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'
import * as UseCases from '@/config/core/use-cases'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import { Torneos } from '@/infraestrcuture/entities/torneos'
import { Button, Modal } from '@mui/material'
import { useParams } from 'next/navigation'
import styles from './styles.module.css'
import '@/components/botonlink.css'

import React, { useEffect, useState } from 'react'
import TabTorneos from './TabTorneos'

const PartidosByTorneos = () => {
    const params = useParams()
    const [openModal, setOpenModal] = useState(false)
    const { jugadores } = useJugador()


    const [partidosByTorneos, setPartidosByTorneos] = useState<Partidos[]>([])
    const [equiposParticipantes, setEquiposParticipantes] = useState<Torneos[]>([])
    const [goleadores, setGoleadores] = useState([])
    const [asistentes, setAsistentes] = useState([])
      const [loading, setLoading] = React.useState(false);
    


    useEffect(() => {
        const getPartidosByTorneo = async () => {
            const session = await getSession()
            const res = await UseCases.getPartidosByTorneosUseCases(fetcherDb, params.idTorneo, session?.token);
            setPartidosByTorneos(res);
        };
    
        
    
        const getEquiposRegistrados = async () => {
            const session = await getSession()
    
            const res = await UseCases.getEquiposRegistrados(fetcherDb, session?.token, params.idTorneo);
    
            setEquiposParticipantes(res.torneo_especifico);
    
            const goleadoresSorted = res.torneo?.goleadores.sort((a, b) => b.cantidad - a.cantidad)
            const asistentesSorted = res.torneo?.asistentes.sort((a, b) => b.cantidad - a.cantidad)
            setGoleadores(goleadoresSorted);
            setAsistentes(asistentesSorted);
        };
        getPartidosByTorneo()
        getEquiposRegistrados()
    }, [params.idTorneo])


    
    const handlerModal = () => {
        setOpenModal(!openModal)
    }
    return (
        <div className={styles.container}>
            <ContenedorCustom >
                <div className='flex gap-2 justify-end items-center'>
                    <BreadCrum titulo='' url={`/torneos/registrar?idTorneo=${params.idTorneo}`} labelBtn='Registrar equipos' />
                    <button onClick={handlerModal} className='btn_link'>Nuevo partido</button>
                </div>
                <TabTorneos partidosByTorneos={partidosByTorneos}  loading={loading}/>

                <Modal open={openModal} onClose={handlerModal}>
                    <div className='w-max h-max m-auto translate-y-52 bg-slate-700 p-4 rounded-md '>
                        <FormPartido equiposParticipantes={equiposParticipantes} />
                    </div>
                </Modal>

            </ContenedorCustom>
        </div>
    )
}

export default PartidosByTorneos