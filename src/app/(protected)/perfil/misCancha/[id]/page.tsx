'use client'
import { getSession } from '@/actions/get-session'
import { CalendarComponent } from '@/components/CalendarComponent'
import { useReservas } from '@/components/hooks/useReservas'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [cancha, setCancha] = useState(null)
  const {eventos,loading,setEventos,setLoading}=useReservas()

  const params = useParams()
  const query = useSearchParams()
  const nombre = query.get('cancha')

  useEffect(()=>{

   const loadReservas = async()=>{
     try {
        setLoading(true)
     const session = await getSession()
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reserva/${params.id}`,{headers:{token:session?.token}})


    // Transformar fechas
    const eventosTransformados = data.map((e: any) => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end),
    }))
setEventos(eventosTransformados)
     } catch (error) {
      throw new Error(error)
     }finally{
        setLoading(false)
     }
   }
loadReservas()
  },[params.id])

  if(loading){
    return <div className='w-full h-screen flex justify-center items-center'><CircularProgress color='primary'/></div>
  }



  return (
    <div className='w-full  p-[80px]'>
      <h1>{nombre}</h1>
      <CalendarComponent eventos={eventos}/>
    </div>
  )
}

export default page