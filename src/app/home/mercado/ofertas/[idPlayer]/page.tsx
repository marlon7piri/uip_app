'use client'
import ContainerOfertas from '@/components/ContainerOfertas'
import { useParams } from 'next/navigation'
import React from 'react'

const Ofertas = () => {

  const params = useParams()

  console.log({ params })

  return (
    <div className='min-h-screen'>

      <ContainerOfertas />
    </div>
  )
}

export default Ofertas