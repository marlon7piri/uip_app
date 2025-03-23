'use client'
import FormEquipo from '@/components/forms/FormEquipo'
import { Title } from '@/components/Title'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const NuevoEquipo = () => {
  const search = useSearchParams()
  const idEquipo = search.get('idEquipo') || null
  return (
    <div className=' py-28 min-h-screen'>
      <Title content={idEquipo ? 'Editar Equipo' : ' Nuevo equipo'} size='text-4xl' />

      <div className='flex justify-center items-center'>
        <FormEquipo />

      </div>

    </div>
  )
}

export default NuevoEquipo