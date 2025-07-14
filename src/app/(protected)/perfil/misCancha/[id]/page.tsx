'use client'
import { CalendarComponent } from '@/components/CalendarComponent'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [cancha, setCancha] = useState(null)
  const params = useParams()


  return (
    <div className='w-full  p-[80px]'>
      <h2>{params.id}</h2>
      <CalendarComponent />
    </div>
  )
}

export default page