'use client'
import React from 'react'
import { Title } from './Title'
import { proximosPartidos } from '@/utils/teams'
import CardProximosPartidos from './CardProximosPartidos'
import BreadCrum from './BreadCrum'
import { useTorneos } from './hooks/useTorneos'
import { Card, Typography } from '@mui/material'
import Image from 'next/image'
import CardTorneos from './CardTorneos'

const ContainerTorneos = () => {
  const { torneos } = useTorneos()

  return (
    <div>
      <BreadCrum titulo='Torneos' url='/home/torneos/nuevo' />


      <div className='flex justify-center items-center gap-4'>
        {torneos.map((e) => {
          return <CardTorneos torneo={e} key={e.nombre} />
        })}
      </div>
      {proximosPartidos.map((e) => {
        return <CardProximosPartidos equipos={e} key={e.nombre} />
      })}
    </div>
  )
}

export default ContainerTorneos