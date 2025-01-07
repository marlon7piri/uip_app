import { Jugadores } from '@/infraestrcuture/entities/jugadores'
import { Torneos } from '@/infraestrcuture/entities/torneos'
import Link from 'next/link'
import React from 'react'
import  './cardtorneos.css'

interface Props {
  torneo: Torneos
}

const CardTorneos = ({ torneo }: Props) => {
  return (
    <Link  href ={`/torneos/partidos/${torneo._id}`} className={'card'}>
      <img src={torneo?.foto}
        alt={torneo.nombre}
        className='w-full h-[250px]  object-cover' />
      <h3 className='txtTitle'>{torneo.nombre}</h3>



    </Link>
  )
}

export default CardTorneos