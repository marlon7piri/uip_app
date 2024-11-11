import ContainerProximosPartidos from '@/components/ContainerProximosPartidos'
import ContainerTorneos from '@/components/ContainerTorneos'
import React from 'react'

const Torneos = () => {
  return (
    <div className='min-h-screen'>
      <ContainerTorneos />

      <ContainerProximosPartidos />

    </div>
  )
}

export default Torneos