import ContainerEquipos from '@/components/ContainerEquipos'
import ContainerJugadores from '@/components/ContainerJugadores'
import React from 'react'

const Equipos = () => {
  return (
    <div className='min-h-screen'>
      <ContainerEquipos />
      <ContainerJugadores />

    </div>
  )
}

export default Equipos