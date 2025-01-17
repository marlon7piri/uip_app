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

      <div className={styles.containerInfo}>
        <div className='flex justify-center items-center flex-col'>
          <Title content={equipo?.nombre} size='text-3xl' color='text-slate-50' />

          <Image src={equipo ? equipo?.logo : ''} width={150} height={80} alt={equipo?.nombre ? equipo?.nombre : 'foto del club'}
            className=' object-cover'
          />
        </div>

        <div>
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
    </div>
  )
}

export default HeaderEquipoInfo