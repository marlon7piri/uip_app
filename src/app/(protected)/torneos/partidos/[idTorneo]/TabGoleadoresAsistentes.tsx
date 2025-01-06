import TorneoTableGoleadores from '@/components/tables/TorneoTableGoleadores'
import { Title } from '@/components/Title'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'

import { getSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as UseCases from '@/config/core/use-cases'


const TabGoleadoresAsistentes = () => {
    const params = useParams()



    const [goleadores, setGoleadores] = useState([])
    const [asistentes, setAsistentes] = useState([])


    useEffect(() => {

        getEquiposRegistrados()
    }, [params.idTorneo])




    const getEquiposRegistrados = async () => {
        const session = await getSession()

        const res = await UseCases.getEquiposRegistrados(fetcherDb, session?.token, params.idTorneo);


        const goleadoresSorted = res.torneo?.goleadores.sort((a, b) => b.cantidad - a.cantidad)
        const asistentesSorted = res.torneo?.asistentes.sort((a, b) => b.cantidad - a.cantidad)
        setGoleadores(goleadoresSorted);
        setAsistentes(asistentesSorted);
    };

    return (
        <div className='w-full flex gap-2'>


            <div className='w-full flex justify-between items-center gap-4'>
                <div>
                <Title content='Goleadores' size='text-2xl' color='text-slate-50'/>
                <TorneoTableGoleadores rows={goleadores} />
                </div>
                
                <div>
                <Title content='Asistentes' size='text-2xl' color='text-slate-50'/>
                <TorneoTableGoleadores rows={asistentes} />
                </div>

               

            </div>



        </div>
    )
}

export default TabGoleadoresAsistentes
