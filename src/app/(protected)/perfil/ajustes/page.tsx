'use client'
import { CalendarComponent } from '@/components/CalendarComponent'
import { FormularioCancha } from '@/components/FormCancha'
import React, { useState } from 'react'
import { CircleOff } from 'lucide-react'



const page = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <div className='w-full  p-10'>

      <div className='w-full mt-20'>
        <button onClick={() => setShowForm(!showForm)}>
          Crear Cancha
        </button>
        <CalendarComponent />
      </div>
      {showForm && <div className='fixed h-full overflow-y-scroll inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-[900]'>

        <FormularioCancha closeModal={() => setShowForm(!showForm)} />
      </div>}
    </div>
  )
}

export default page