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
        <div className='w-full h-screen flex gap-2 '>


            {loading ? <Spinner /> : <div className='w-full flex  flex-wrap items-start gap-4 '>
                <div>
                    <div className='flex gap-2 justify-center items-center pb-6'>
                        <span className='text-xl text-slate-50 font-bold'>
                            Goleadores
                        </span>
                        <img src="/soccer-ball.svg" alt="icono" width={30} height={30} />
                    </div>

                    <TorneoTableGoleadores rows={goleadores} />
                </div>

                <div>
                <div className='flex gap-2 justify-center items-center pb-6'>
                        <span className='text-xl text-slate-50 font-bold'>
                        Asistentes
                        </span>
                        <img src="/shoes.svg" alt="icono" width={30} height={30} />
                    </div>
                    <TorneoTableGoleadores rows={asistentes} />
                </div>
                <div>
                <div className='flex gap-2 justify-center items-center pb-6 relative'>
                        <span className='text-xl text-slate-50 font-bold'>
                        Amarillas
                        </span>
                        <span className='w-4 h-4  bg-yellow-600'/>
                    </div>
                    <TorneoTableGoleadores rows={amarillas} />
                </div>
                <div>
                <div className='flex gap-2 justify-center items-center pb-6'>
                        <span className='text-xl text-slate-50 font-bold'>
                        Rojas
                        </span>
                        <span className='w-4 h-4  bg-red-700'/>
                    </div>
               <TorneoTableGoleadores rows={rojas} />
                </div>



            </div>}



        </div>
    )
}

export default TabGoleadoresAsistentes
