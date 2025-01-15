import { Jugadores } from '@/infraestrcuture/entities/jugadores'
import React from 'react'

interface Props {
  jugador: Jugadores
}

const CardJugadores = ({ jugador }: Props) => {

  return (
    <div className='flex flex-col p-2 justify-center  items-center bg-slate-50 gap-4 text-slate-900 mt-2 w-[200px]
     rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300'>
      <img src={jugador?.foto}
        alt={jugador?.nombre}
        className='w-[130px] h-[130px] rounded-full object-cover' />
      <h3>Nombre: {jugador?.nombre}</h3>
      <h3>Apellido: {jugador?.apellido}</h3>
      <h3>Edad: {jugador?.edad}</h3>
      <h3>Estatura: {jugador?.estatura}cm</h3>
      <img src={jugador?.club?.logo} className='w-[100px] h-[100px] rounded-full bg-cover' alt={jugador?.nombre} />



    </div>
  )
}

export default CardJugadores