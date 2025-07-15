'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Calendar, dateFnsLocalizer, SlotInfo, Event as RBCEvent } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, isEqual } from 'date-fns'
import { es } from 'date-fns/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useReservas } from './hooks/useReservas'
import { useRouter, useSearchParams } from 'next/navigation'

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

interface Props{
  eventos:any[]
}
export const CalendarComponent = ({eventos}:Props) => {
  const {handleDoubleClickEvent,handlerSelectSlot} = useReservas()
const calendarRef = useRef<Calendar>()
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

  

  return (
    <div >
      <Calendar
      ref={calendarRef}
        culture='es'
        localizer={localizer}
        selectable
        events={eventos}
        onDoubleClickEvent={handleDoubleClickEvent}
        onSelectSlot={handlerSelectSlot}
        eventPropGetter={eventStylegetter}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '700px', backgroundColor: "white", zIndex: 500 }}
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
    </div>
  )
}

