import { Equipos } from '@/infraestrcuture/entities/equipos'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './cardequipos.module.css'
import { CircularProgress } from '@mui/material'



interface Props {
  equipos: Equipos
}
const CardEquipos = ({ equipos }: Props) => {
  return (
    <Link href={`/equipos/${equipos._id}`} key={equipos.nombre} className={styles.card}>
      <h3 className={styles.txtTitle}>{equipos.nombre}</h3>

      {equipos ? <Image src={equipos.logo} width={100} height={100} alt={equipos?.nombre}
        className=' object-cover '
      /> : <CircularProgress />}
    </Link>
  )
}

export default CardEquipos