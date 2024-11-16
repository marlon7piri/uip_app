import FormPartido from '@/components/forms/FormPartido'
import { Title } from '@/components/Title'
import React from 'react'

const NuevoPartido = () => {
  return (
    <div className='w-full h-screen'>

      <Title content='Crear Nuevo Partido' size='text-6xl' />
      <FormPartido />
    </div>
  )
}

export default NuevoPartido