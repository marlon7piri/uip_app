import React from 'react'
import CardEquipos from './CardEquipos'
import { Title } from './Title'
import { equiposFutbol } from '@/utils/teams'
import BreadCrum from './BreadCrum'

const ContainerEquipos = () => {
  return (
    <div className='p-4'>
      <BreadCrum titulo='Equipos' url='/home/equipos/nuevo' />

      <div className='flex flex-wrap gap-4'>
        {equiposFutbol.map((e) => {
          return <CardEquipos equipos={e} key={e.logo} />

        })}
      </div>

    </div>
  )
}

export default ContainerEquipos