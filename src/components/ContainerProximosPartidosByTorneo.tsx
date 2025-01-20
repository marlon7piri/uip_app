import { Partidos } from '@/infraestrcuture/entities/partidos'
import React from 'react'
import CardPartidosByTorneo from './CardPartidosByTorneo'
import TorneoTablePositioon from './tables/TorneoTablePositioon'


interface Props {
    partidos: Partidos[]
}
const ContainerProximosPartidosByTorneo = ({ partidos }: Props) => {


    return (
        <div className='mt-10'>
            <div className='flex flex-wrap gap-4'>
                {partidos.map((e) => {
                    return <CardPartidosByTorneo partido={e} key={e._id} />


                })}
            </div>


        </div>
    )
}

export default ContainerProximosPartidosByTorneo