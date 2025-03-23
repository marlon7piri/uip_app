import TorneoTableGoleadores from '@/components/tables/TorneoTableGoleadores'
import { Title } from '@/components/Title'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'

import { getSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import * as UseCases from '@/config/core/use-cases'
import Spinner from '@/components/Spinner'


const TabGoleadoresAsistentes = () => {
    const params = useParams()



    const [goleadores, setGoleadores] = useState([])
    const [asistentes, setAsistentes] = useState([])
    const [amarillas, setAmarillas] = useState([])
    const [rojas, setRojas] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    useEffect(() => {
        const getEquiposRegistrados = async () => {
            const session = await getSession()
            try {
                setLoading(true)



                const res = await UseCases.getEquiposRegistrados(fetcherDb, session?.token, params.idTorneo);


                const goleadoresSorted = res.torneo?.goleadores.sort((a, b) => b.cantidad - a.cantidad)
                const asistentesSorted = res.torneo?.asistentes.sort((a, b) => b.cantidad - a.cantidad)
                const amarillassorted = res.torneo?.sancionados_amarilla.sort((a, b) => b.cantidad - a.cantidad)
                const rojassorted = res.torneo?.sancionados_roja.sort((a, b) => b.cantidad - a.cantidad)
                setGoleadores(goleadoresSorted);
                setAsistentes(asistentesSorted);
                setAmarillas(amarillassorted);
                setRojas(rojassorted);

                setLoading(false)
            } catch (error) {
                throw new Error('Error fetching los goleadores y asistentes')
            }


        };
        getEquiposRegistrados()
    }, [params.idTorneo])


    return (
        <div className='w-full min-h-screen  flex gap-2 '>


            {loading ? <Spinner /> : <div className='w-full flex justify-between items-start gap-4'>
                <div>
                    <Title content='Goleadores' size='text-2xl' color='text-slate-50' />
                    <TorneoTableGoleadores rows={goleadores} />
                </div>

                <div>
                    <Title content='Asistentes' size='text-2xl' color='text-slate-50' />
                    <TorneoTableGoleadores rows={asistentes} />
                </div>
                <div>
                    <Title content='Amarillas' size='text-2xl' color='text-slate-50' />
                    <TorneoTableGoleadores rows={amarillas} />
                </div>
                <div>
                    <Title content='Rojas' size='text-2xl' color='text-slate-50' />
                    <TorneoTableGoleadores rows={rojas} />
                </div>



            </div>}



        </div>
    )
}

export default TabGoleadoresAsistentes
