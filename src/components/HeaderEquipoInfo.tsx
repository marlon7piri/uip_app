import { Equipos } from '@/infraestrcuture/entities/equipos'
import React from 'react'
import { Title } from './Title'
import Image from 'next/image'


interface Props {
  equipo: Equipos
}
const HeaderEquipoInfo = ({ equipo }: Props) => {



  return (
    <div className='w-full bg-slate-50 p-4 mb-10'>
      <div className='flex justify-start items-center gap-4'>
        <Image src={equipo?.logo ? equipo?.logo : ''} width={150} height={150} alt={equipo?.nombre ? equipo?.nombre : 'foto del club'}
          className='rounded-full'
        />
        <ul>
          <li>Goles:{equipo?.estadisticasGlobales?.goles_favor}</li>
          <li>Goles en Contra:{equipo?.estadisticasGlobales?.goles_contra}</li>
          <li>Asistencias:{equipo?.estadisticasGlobales?.asistencias}</li>
          <li>Partidos Jugados:{equipo?.estadisticasGlobales?.partidos_jugados}</li>
          <li>Partidos Ganados:{equipo?.estadisticasGlobales?.partidos_ganados}</li>
          <li>Partidos Perdidos:{equipo?.estadisticasGlobales?.partidos_perdidos}</li>
          <li>Partidos Empatados:{equipo?.estadisticasGlobales?.partidos_empatados}</li>
        </ul>
        <Title content={equipo?.nombre} size='text-3xl' color='text-slate-900' />
      </div>
    </div>
  )
}

export default HeaderEquipoInfo