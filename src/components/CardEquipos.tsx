import { Equipos } from '@/infraestrcuture/entities/equipos'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './cardequipos.module.css'



interface Props {
  equipos: Equipos
}
const CardEquipos = ({ equipos }: Props) => {
  return (
    <Link href={`/equipos/${equipos._id}`} key={equipos.nombre} className={styles.card}>
      <h3 className={styles.txtTitle}>{equipos.nombre}</h3>
     
       <Image src={equipos.logo} width={140} height={140} alt={equipos?.nombre}
        className=' object-cover '
      /> 
    </Link>
  )
}

export default CardEquipos