import { Jugadores } from '@/infraestrcuture/entities/jugadores'
import { Ofertas } from '@/infraestrcuture/entities/ofertas'
import React from 'react'

interface Props {
  ofertas: Ofertas
}

const CardNoticias = ({ ofertas }: Props) => {


  return (
    <div className='flex  p-2 justify-center  items-center bg-slate-50 gap-4 text-slate-900 mt-2 w-full
     rounded-3xl  transition-all duration-300'>
      <img src={ofertas?.jugador?.club?.logo}
        alt={ofertas?.jugador?.nombre}
        className='w-[130px] h-[130px] rounded-full object-cover' />
      <img src={ofertas?.jugador?.foto}
        alt={ofertas?.jugador?.nombre}
        className='w-[130px] h-[130px] rounded-full object-cover' />
      <h3>Jugador: {ofertas?.jugador?.nombre + " " + ofertas?.jugador?.apellido}</h3>
      <h3>Oferta: ${ofertas?.monto}</h3>
      <h3>Descripcion: {ofertas?.descripcion}</h3>
      <h3>Autor: {ofertas?.author?.nameUser}</h3>



    </div>
  )
}

export default CardNoticias