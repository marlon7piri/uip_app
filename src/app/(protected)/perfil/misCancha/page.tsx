'use client'
import { CalendarComponent } from '@/components/CalendarComponent'
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
      {myCanchas.map(e => <Link href={`/perfil/misCancha/${e._id}`} className='bg-slate-50 p-4 mt-64'>
        <p>{e.nombre}</p>
      </Link>)}
    </div>
  )
}

export default page