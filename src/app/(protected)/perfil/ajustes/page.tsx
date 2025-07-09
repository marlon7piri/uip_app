import { CalendarComponent } from '@/components/CalendarComponent'
import { FormularioCancha } from '@/components/FormCancha'
import React from 'react'



const page = () => {
  return (
    <div className='w-full flex flex-wrap gap-4 p-10'>
      <div className='w-[60%]'>
        <CalendarComponent />
      </div>
      <div className='w-[30%]'>

        <FormularioCancha />
      </div>
    </div>
  )
}

export default page