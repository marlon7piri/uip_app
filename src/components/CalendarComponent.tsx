'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Calendar, dateFnsLocalizer, SlotInfo, Event as RBCEvent } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, isEqual } from 'date-fns'
import { es } from 'date-fns/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useReservas } from './hooks/useReservas'
import { Modal } from '@mui/material'
import { authReserva } from '@/utils/zustand/reservas'

// Configurar el localizador con date-fns
const locales = {
  'es': es,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})
// Tipo para eventos
interface EventType {
  title: string
  start: Date
  end: Date
  allDay?: boolean
}

interface Props {
  eventos: any[]
}
export const CalendarComponent = ({ eventos }: Props) => {
  const { handleDoubleClickEvent, handlerSelectSlot, reserva, setReserva } = useReservas()
  const eventStylegetter = (event: EventType) => {

    const backgroundColor = event.title == "Ocupado" ? '#e74c3c' : '#3174ad'

    let style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
    }
    return {
      style
    }
  }

  const showModalResserva = authReserva(state => state.showModalResserva)


  return (
    <div className=' min-w-[500px] h-full'>
      <Calendar
        culture='es'
        localizer={localizer}
        selectable
        events={eventos}
        onDoubleClickEvent={handleDoubleClickEvent}
        onSelectSlot={handlerSelectSlot}
        eventPropGetter={eventStylegetter}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '700px', backgroundColor: "white", zIndex: 1000 }}
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
        }}
      />

      <Modal open={showModalResserva} onClose={() => authReserva.getState().closeModal()}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Formulario de Reserva</h2>

          <form
            className="flex flex-col gap-4 outline-none"
            onSubmit={(e) => {
              e.preventDefault()
              // Aquí puedes manejar el envío
              const form = e.target as HTMLFormElement
              const formData = new FormData(form)



              // Aquí puedes enviar a tu API con axios, por ejemplo

              // axios.post('/api/reservas', reserva)
              authReserva.getState().closeModal()
            }}
          >
            <label className="flex flex-col">
              Título
              <input name="title" required className="border p-2 rounded" defaultValue="Partido de fútbol 2" />
            </label>

            <label className="flex flex-col">
              Inicio
              <p className="border p-2 rounded"  >{format(reserva.start, "yyyy-MM-dd HH:mm")}</p>
            </label>

            <label className="flex flex-col">
              Fin
              <p className="border p-2 rounded"  >{format(reserva.end, "yyyy-MM-dd HH:mm")}</p>
            </label>

            <label className="flex flex-col">
              ID de Usuario
              <input name="userId" required className="border p-2 rounded" defaultValue="6853477c40a55afe73ff1397" />
            </label>

            <label className="flex flex-col">
              ID de Cancha
              <input name="canchaId" required className="border p-2 rounded" defaultValue="687481c511bd405209b53df7" />
            </label>

            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Reservar
            </button>
          </form>
        </div>
      </Modal>

    </div>
  )
}

