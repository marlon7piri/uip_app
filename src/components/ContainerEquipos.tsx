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
    <ContenedorCustom>
      <BreadCrum titulo='Equipos' url='/equipos/nuevo' labelBtn='Nuevo Equipo' />

      <div className=' flex flex-wrap items-center justify-center gap-8 mt-8'>
        {equipos.map((e) => {
          return <CardEquipos equipos={e} key={e.logo} />

        })}
      </div>

    </ContenedorCustom>
  )
}

export default ContainerEquipos