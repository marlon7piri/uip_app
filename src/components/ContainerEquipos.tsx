'use client'
import React from 'react'
import CardEquipos from './CardEquipos'

import BreadCrum from './BreadCrum'
import { useEquipos } from './hooks/useEquipos'

const ContainerEquipos = () => {
  const { equipos } = useEquipos()
  return (
    <div className='p-4'>
      <BreadCrum titulo='Equipos' url='/home/equipos/nuevo' />

      <div className='flex flex-wrap gap-4'>
        {equipos.map((e) => {
          return <CardEquipos equipos={e} key={e.logo} />

        })}
      </div>

    </div>
  )
}

export default ContainerEquipos