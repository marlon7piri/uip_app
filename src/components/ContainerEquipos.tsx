'use client'
import React from 'react'
import CardEquipos from './CardEquipos'

import BreadCrum from './BreadCrum'
import { useEquipos } from './hooks/useEquipos'
import { CircularProgress } from '@mui/material'
import { Equipos } from '@/infraestrcuture/entities/equipos'
import ContenedorCustom from './ContenedorCustom'
import Spinner from './Spinner'


interface Props {
  equipos: Equipos[]
}
const ContainerEquipos = ({ equipos }: Props) => {



  return (
    <div className='pt-[100px]'>
      <BreadCrum titulo='Equipos' url='/equipos/nuevo' labelBtn='Nuevo Equipo' />

      <div className=' grid  sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8  p-4'>
        {equipos?.map((e) => {
          return <CardEquipos equipos={e} key={e.logo} />

        })}
      </div>

    </div>
  )
}

export default ContainerEquipos