import React from 'react'
import CardJugadores from './CardJugadores'
import { jugadores } from '@/utils/jugadores'
import { Title } from './Title'

const ContainerJugadores = () => {


  return (
    <div className='p-4'>
      <Title size='text-6xl' content='Jugadores' />
      <div className='flex flex-wrap gap-4'>
        {jugadores.map((e) => {
          return <CardJugadores jugador={e} key={e.foto} />

        })}
      </div>

    </div>
  )
}

export default ContainerJugadores