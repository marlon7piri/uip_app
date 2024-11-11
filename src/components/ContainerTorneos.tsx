'use client'
import React from 'react'
import { Title } from './Title'
import { proximosPartidos } from '@/utils/teams'
import CardProximosPartidos from './CardProximosPartidos'
import BreadCrum from './BreadCrum'
import { useTorneos } from './hooks/useTorneos'
import { Card, Typography } from '@mui/material'
import CardTorneos from './CardTorneos'
import ContainerProximosPartidos from './ContainerProximosPartidos'

const ContainerTorneos = () => {
  const { torneos } = useTorneos()

  return (
    <div>
      <BreadCrum titulo='Torneos' url='/home/torneos/nuevo' />


      <div className='flex justify-center items-center gap-4'>
        {torneos.map((e) => {
          return <CardTorneos torneo={e} key={e?._id} />
        })}
      </div>



    </div>
  )
}

export default ContainerTorneos