import FormEquipo from '@/components/forms/FormEquipo'
import { Title } from '@/components/Title'
import { Card } from '@mui/material'
import React from 'react'

const NuevoEquipo = () => {
  return (
    <div className='h-screen'>
      <Title content='Nuevo equipo' size='text-4xl' />

      <div className='flex justify-center items-center'>
        <FormEquipo />

      </div>

    </div>
  )
}

export default NuevoEquipo