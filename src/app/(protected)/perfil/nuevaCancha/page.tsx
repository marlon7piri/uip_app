'use client'
import { CalendarComponent } from '@/components/CalendarComponent'
import { FormularioCancha } from '@/components/FormCancha'
import React, { useState } from 'react'



const page = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <div className='w-full  p-10'>

      <div className='w-full mt-20'>

        <FormularioCancha closeModal={() => setShowForm(!showForm)} />
      </div>
    </div>
  )
}

export default page