'use client'
import { CalendarComponent } from '@/components/CalendarComponent'
import CardCancha from '@/components/CardCancha'
import CardMyCancha from '@/components/CardMyCancha'
import { useCancha } from '@/components/hooks/useCancha'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const { getMyCancha, myCanchas } = useCancha()


  useEffect(() => {
    getMyCancha()
  }, [])

  console.log(myCanchas)
  return (
    <div className='w-full  p-[80px]'>
      {myCanchas.map(e =><CardMyCancha item={e} key={e?._id} />
      )}
    </div>
  )
}

export default page