import { Equipos } from '@/infraestrcuture/entities/equipos'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import Link from 'next/link'
import React from 'react'
import styles from '@/app/(protected)/torneos/partidos/[idTorneo]/styles.module.css'



interface Props {
  partido: Partidos
}

const CardPartidosByTorneo = ({ partido }: Props) => {

  return (
   <Link href={`/torneos/partidos/edit?idTorneo=${partido.torneo_id._id}&idPartido=${partido._id}&idLocal=${partido.local._id}&idVisitante=${partido.visitante._id}`}>
    <div className={styles.cardPartidos}>

<div className='flex gap-4 justify-center items-center'>
  <div className='flex flex-col justify-center items-center '>
    <h3 className={styles.textTitle}>{partido?.local?.nombre}</h3>

    <img src={partido?.local?.logo} className='w-[100px] h-[100px] rounded-full bg-cover' alt={partido?.local?.nombre} />


  </div>
  <h3 className={styles.textTitle}>VS</h3>

  <div className='flex flex-col justify-center items-center '>
    <h3 className={styles.textTitle}>{partido?.visitante?.nombre}</h3>
    <img src={partido?.visitante?.logo} className='w-[100px] h-[100px] rounded-full bg-cover' alt={partido?.visitante?.nombre} />


  </div>
</div>

<div>
<div className='flex justify-center items-center'>
<h3 className={styles.textTitle}>{partido?.resultado?.golesLocal}</h3>
<span className={styles.textTitle}>-</span>
<h3 className={styles.textTitle}>{partido?.resultado?.golesVisitante}</h3>

</div>

  <h3 className={styles.textTitle}>Torneo: {partido?.torneo_id?.nombre?.toUpperCase()}</h3>
  <h3 className={styles.textTitle}>Estadio: {partido?.estadio}</h3>
  <h3 className={styles.textTitle}>Fecha: {partido?.fecha?.substring(0, 10)}</h3>
  

</div>
</div>
   </Link>
  )
}

export default CardPartidosByTorneo