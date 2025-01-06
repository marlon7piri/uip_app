import { getSession } from '@/actions/get-session'
import ContainerProximosPartidosByTorneo from '@/components/ContainerProximosPartidosByTorneo'
import { Title } from '@/components/Title'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as UseCases from '@/config/core/use-cases'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'
import Spinner from '@/components/Spinner'


const TabPartidos = () => {
     const params = useParams()
    
        const [partidosByTorneos, setPartidosByTorneos] = useState<Partidos[]>([])
                const [loading,setLoading]=useState(false)
        
       
    
    
        useEffect(() => {
    
            getPartidosByTorneo()
        }, [params.idTorneo])
    
    
        const getPartidosByTorneo = async () => {
            setLoading(true)
            const session = await getSession()
            const res = await UseCases.getPartidosByTorneosUseCases(fetcherDb, params.idTorneo, session?.token);
            setPartidosByTorneos(res);
            setLoading(false)

        };
    
      

    return (
    <div>
    <Title content='Partidos' size='text-4xl' color='text-slate-50'/>

   {loading ? <Spinner/> : <ContainerProximosPartidosByTorneo partidos={partidosByTorneos} />}


      
    </div>
    )
}

export default TabPartidos
