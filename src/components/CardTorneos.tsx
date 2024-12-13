import { Jugadores } from '@/infraestrcuture/entities/jugadores'
import { Torneos } from '@/infraestrcuture/entities/torneos'
import Link from 'next/link'
import React from 'react'

interface Props {
  torneo: Torneos
}

const CardTorneos = ({ torneo }: Props) => {
  return (
    <Link  href ={`/home/torneos/partidos/${torneo._id}`} className='flex flex-col p-2 justify-center  items-center bg-slate-900 gap-4 text-slate-50 mt-2 
     rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300'>
      <img src={torneo.foto}
        alt={torneo.nombre}
        className='w-[430px] h-[330px]  object-cover' />
      <h3>Nombre: {torneo.nombre}</h3>



    </Link>
  )
}

export default CardTorneos