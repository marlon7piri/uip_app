import { Equipos } from '@/infraestrcuture/entities/equipos'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



interface Props {
  equipos: Equipos
}
const CardEquipos = ({ equipos }: Props) => {
  return (
    <Link href={`/equipos/${equipos._id}`} key={equipos.nombre} className='w-[200px] h-[200px] bg-slate-900 p-2 text-slate-50 flex
     flex-col gap-2 justify-center items-center rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300'>
      <h3>{equipos.nombre}</h3>
      <Image src={equipos.logo} width={100} height={100} alt={equipos?.nombre}
        className='rounded-full object-contain'
      />
    </Link>
  )
}

export default CardEquipos