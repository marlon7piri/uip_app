'use client'
import { CalendarComponent } from '@/components/CalendarComponent'
import { Bathroom, BathroomOutlined, BathroomRounded, BathroomSharp, LocalParking, Restaurant, ShowerSharp, Wifi } from '@mui/icons-material'
import React, { FormEvent, FormEventHandler } from 'react'



export const FormularioCancha = () => {
  const comodidades = [
    {
      label: "Restaurante",
      icono: <Restaurant />
    },
    {
      label: "Estacionamiento gratis",
      icono: <LocalParking />
    },
    {
      label: "Wifi",
      icono: <Wifi />
    },
    {
      label: "Baños",
      icono: <BathroomRounded />
    },

    {
      label: "Duchas",
      icono: <ShowerSharp />
    }

  ]

  const handlerSubmit = (event: FormEvent) => {
    event.preventDefault()

    alert("enviando data")

  }
  return (

    <form onSubmit={handlerSubmit} className=' flex flex-col gap-2 mt-[150px] bg-slate-50 text-slate-900 p-4 '>
      <label htmlFor="">Nombre de la cancha:</label>
      <input type="text" className='outline-none p-1 rounded-md border border-slate-900 focus:border-sky-500' />
      <label htmlFor="">Direccion:</label>
      <input type="text" className='outline-none p-1 rounded-md border border-slate-900 focus:border-sky-500' />
      <label htmlFor="">Precio por hora:</label>
      <input type="number" className='outline-none p-1 rounded-md border border-slate-900 focus:border-sky-500' />

      <label htmlFor="">WhatsApp:</label>
      <input type="text" className='outline-none p-1 rounded-md border border-slate-900 focus:border-sky-500' />
      <label htmlFor="">Yappy:</label>
      <input type="text" className='outline-none p-1 rounded-md border border-slate-900 focus:border-sky-500' />
      <label htmlFor="">Información de la propiedad:</label>
      {
        comodidades?.map(c => (

          <div className='flex gap-1'>
            {c.icono}
            <label htmlFor="">{c.label}</label>
            <input type="radio" name="" id="" className='hover:cursor-pointer' />
          </div>

        ))
      }

      <button type='submit' className='w-full bg-sky-500 text-slate-900 uppercase p-4 rounded-sm hover:bg-sky-700 transition duration-500'>Crear cancha</button>
    </form>
  )
}