'use client'
import ContainerEquipos from '@/components/ContainerEquipos'
import ContainerJugadores from '@/components/ContainerJugadores'
import { useEquipos } from '@/components/hooks/useEquipos'
import { useJugador } from '@/components/hooks/useJugador'
import React from 'react'

const Equipos = () => {
  const { jugadores } = useJugador()
  const { equipos } = useEquipos()
  return (
    <div className='min-h-screen'>
      <ContainerEquipos equipos={equipos} />
      <ContainerJugadores jugadores={jugadores} />

    </div>
  )
}

export default Equipos