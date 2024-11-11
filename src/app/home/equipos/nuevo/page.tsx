import FormEquipo from '@/components/forms/FormEquipo'
import { Title } from '@/components/Title'
import { Card } from '@mui/material'
import React from 'react'

const NuevoEquipo = () => {
  return (
    <div className='h-screen'>
      <Title content='NuevoEquipo' size='text-6xl' />


      <FormEquipo />

    </div>
  )
}

export default NuevoEquipo