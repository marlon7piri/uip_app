'use client'
import React from 'react'
import CardJugadores from './CardJugadores'
import { Title } from './Title'
import BreadCrum from './BreadCrum'
import { useJugador } from './hooks/useJugador'

const ContainerJugadores = () => {
  const { jugadores } = useJugador()


  return (
    <div className='p-4'>
      <BreadCrum titulo='Jugadores' url='/home/jugadores/nuevo' />

      <div className='flex flex-wrap gap-4'>
        {jugadores.map((e) => {
          return <CardJugadores jugador={e} key={e?._id} />

        })}
      </div>

    </div>
  )
}

export default ContainerJugadores