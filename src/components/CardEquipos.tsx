import { Equipos } from '@/infraestrcuture/entities/equipos'
import React from 'react'



interface Props {
  equipos: Equipos
}
const CardEquipos = ({ equipos }: Props) => {
  return (
    <div key={equipos.nombre} className='bg-slate-900 p-2 text-slate-50 flex
     flex-col gap-2 justify-center items-center rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300'>
      <h3>{equipos.nombre}</h3>
      <img src={equipos.logo} className='w-[200px] h-[200px] rounded-full bg-cover' alt={equipos.nombre} />
    </div>
  )
}

export default CardEquipos