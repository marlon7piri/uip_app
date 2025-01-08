import { Equipos } from '@/infraestrcuture/entities/equipos'
import React from 'react'
import { Title } from './Title'
import Image from 'next/image'
import styles from './headerequipoinfo.module.css'


interface Props {
  equipo: Equipos
}
const HeaderEquipoInfo = ({ equipo }: Props) => {



  return (
    <div className={styles.card}>
        <Title content={equipo?.nombre} size='text-3xl' color='text-slate-50' />

      <div className='flex justify-start items-center gap-4'>
        <Image src={equipo ? equipo?.logo : ''} width={150} height={150} alt={equipo?.nombre ? equipo?.nombre : 'foto del club'}
          className=' object-cover'
        />
        <ul className={styles.lista}>
          <li>Goles: {equipo?.estadisticasGlobales?.goles_favor}</li>
          <li>Goles en Contra: {equipo?.estadisticasGlobales?.goles_contra}</li>
          <li>Partidos Jugados: {equipo?.estadisticasGlobales?.partidos_jugados}</li>
          <li>Partidos Ganados: {equipo?.estadisticasGlobales?.partidos_ganados}</li>
          <li>Partidos Perdidos: {equipo?.estadisticasGlobales?.partidos_perdidos}</li>
          <li>Partidos Empatados:  {equipo?.estadisticasGlobales?.partidos_empatados}</li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderEquipoInfo