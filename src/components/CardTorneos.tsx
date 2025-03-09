import { Jugadores } from '@/infraestrcuture/entities/jugadores'
import { Torneos } from '@/infraestrcuture/entities/torneos'
import Link from 'next/link'
import React, { useEffect } from 'react'
import './cardtorneos.css'
import Image from 'next/image'

interface Props {
  torneo: Torneos
}

const CardTorneos = ({ torneo }: Props) => {


  return (
    <Link href={`/ligas/partidos/${torneo._id}`} className={'card'}


    >
      <Image src={torneo?.foto}
        alt={torneo.nombre}
        width={350} height={350}
        className='w-full h-[380px]  object-cover' />
      <h3 className='txtTitle'>{torneo.nombre}</h3>



    </Link>
  )
}

export default CardTorneos