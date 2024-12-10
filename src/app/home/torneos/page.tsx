'use client'
import ContainerProximosPartidos from '@/components/ContainerProximosPartidos'
import ContainerTorneos from '@/components/ContainerTorneos'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'

const Torneos = () => {
  


  return (
    <div className='min-h-screen'>
      <ContainerTorneos />

     

    </div>
  )
}

export default Torneos