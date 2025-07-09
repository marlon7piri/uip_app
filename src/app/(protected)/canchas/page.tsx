'use client'
import { getSession } from '@/actions/get-session'
import CardCancha from '@/components/CardCancha'
import Mapa from '@/components/Mapa'
import { CanchaResponse } from '@/infraestrcuture/entities/canchas'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



const page = () => {
  const [canchas, setCanchas] = useState<CanchaResponse[]>([])

  useEffect(() => {

    const fetchCancha = async () => {
      try {
        const session = await getSession()

        if (session?.user) {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cancha`, {
            headers: {
              token: session?.token
            }
          })
          setCanchas(res.data)
        }

      } catch (error) {
        console.log(error)
        throw new Error("Error fetching cancha")
      }
    }
    fetchCancha()
  }, [])

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      {/*  <Mapa /> */}
      <div className='flex gap-4'>
        {
          canchas?.map(e => <CardCancha item={e} key={e?._id} />)
        }
      </div>
    </div>
  )
}

export default page