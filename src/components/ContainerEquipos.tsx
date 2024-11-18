'use client'
import React from 'react'
import CardEquipos from './CardEquipos'

import BreadCrum from './BreadCrum'
import { useEquipos } from './hooks/useEquipos'
import { CircularProgress } from '@mui/material'
import { Equipos } from '@/infraestrcuture/entities/equipos'


interface Props {
  equipos: Equipos[]
}
const ContainerEquipos = ({ equipos }: Props) => {
  const { loading } = useEquipos()


  if (loading) {
    return <CircularProgress />
  }
  return (
    <div className='w-full min-h-screen  p-4'>
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