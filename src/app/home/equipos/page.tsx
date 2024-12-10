'use client'
import ContainerEquipos from '@/components/ContainerEquipos'
import ContainerJugadores from '@/components/ContainerJugadores'
import { useEquipos } from '@/components/hooks/useEquipos'
import { useJugador } from '@/components/hooks/useJugador'
import React, { useEffect } from 'react'

const Equipos = () => {
  const { equipos } = useEquipos()


  return (
    <div className='min-h-screen'>
      <ContainerEquipos equipos={equipos} />
     

    </div>
  )
}

export default Equipos