'use client'
import React, { useEffect } from 'react'
import CardJugadores from './CardJugadores'
import { Title } from './Title'
import BreadCrum from './BreadCrum'
import { useJugador } from './hooks/useJugador'
import { CircularProgress } from '@mui/material'
import { Jugadores } from '@/infraestrcuture/entities/jugadores'

interface Props {
  jugadores: Jugadores[]
}
const ContainerJugadores = ({ jugadores }: Props) => {
  const { loading } = useJugador()


  if (loading) {
    return <CircularProgress />
  }

  return (
    <div className='w-full min-h-screen p-4'>
      <BreadCrum titulo='Jugadores' url='/jugadores/nuevo' />

      <div className='flex flex-wrap gap-4'>
        {jugadores.map((e) => {
          return <CardJugadores jugador={e} key={e?._id} />

        })}
      </div>

    </div>
  )
}

export default ContainerJugadores