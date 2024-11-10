import { Equipos } from '@/infraestrcuture/entities/equipos'
import React from 'react'



interface Props {
  equipos: Equipos[]
}
const CardProximosPartidos = ({ equipos }: Props) => {
  return (
    <div>
      <h3>{equipos.nombre}</h3>
      <img src={equipos.logo} className='w-[200px] h-[200px] rounded-full bg-cover' alt={equipos.nombre} />
    </div>
  )
}

export default CardProximosPartidos