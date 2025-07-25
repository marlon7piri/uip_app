'use client'
import { proximosPartidos } from '@/utils/teams'
import React from 'react'
import CardProximosPartidos from './CardProximosPartidos'
import BreadCrum from './BreadCrum'
import { usePartidos } from './hooks/usePartidos'
import { Title } from './Title'

const ContainerProximosPartidos = () => {
  const { partidos } = usePartidos()

  return (
    <div>
      <Title content='Proximos Partidos' size='text-3xl' />

      <div className='flex flex-wrap justify-center items-center gap-10 p-10'>
        {partidos.map((e) => {
          return <CardProximosPartidos partido={e} key={e._id} />
        })}
      </div>
    </div>
  )
}

export default ContainerProximosPartidos