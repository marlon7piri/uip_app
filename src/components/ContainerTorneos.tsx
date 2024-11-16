'use client'
import React, { useEffect } from 'react'
import { Title } from './Title'
import { proximosPartidos } from '@/utils/teams'
import CardProximosPartidos from './CardProximosPartidos'
import BreadCrum from './BreadCrum'
import { useTorneos } from './hooks/useTorneos'
import { Card, CircularProgress, Typography } from '@mui/material'
import CardTorneos from './CardTorneos'
import ContainerProximosPartidos from './ContainerProximosPartidos'

const ContainerTorneos = () => {
  const { torneos, loading } = useTorneos()

  if (loading) {
    return <CircularProgress />
  }

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