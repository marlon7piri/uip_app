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
      <h3>{equipos.nombre}</h3>
      <Image src={equipos.logo} width={100} height={100} alt={equipos?.nombre}
        className='rounded-full object-contain'
      />
    </Link>
  )
}

export default CardEquipos