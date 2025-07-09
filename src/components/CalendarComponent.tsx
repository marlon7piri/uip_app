'use client'
import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer, SlotInfo, Event as RBCEvent } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, isEqual } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Configurar el localizador con date-fns
const locales = {
  'en-US': enUS,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

// Eventos de ejemplo
const events = [
  {
    title: 'Reunión con el equipo',
    start: new Date(2025, 6, 10, 10, 0),
    end: new Date(2025, 6, 10, 12, 0),
  },
  {
    title: 'Cita con el cliente',
    start: new Date(2025, 6, 11, 14, 0),
    end: new Date(2025, 6, 11, 15, 0),
  },
  {
    title: 'Partido reservado',
    start: new Date(2025, 6, 10, 14, 30), // 10 de julio 2025, 14:30
    end: new Date(2025, 6, 10, 16, 0),    // 10 de julio 2025, 16:00
  }
]
// Tipo para eventos
interface EventType {
  title: string
  start: Date
  end: Date
  allDay?: boolean
}
export const CalendarComponent = () => {

  const [eventos, setEventos] = useState(events)



  const isDateConflict = (start: Date, end: Date) => {
    return eventos.some(event => isEqual(event.start, start) && isEqual(event.end, end))
  }
  const handlerSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end } = slotInfo

    if (isDateConflict(start, end)) {
      alert('Esta fecha ya está ocupada.')
      return
    }

    const confirm = window.confirm("¿Marcar esta fecha como ocupada?")

    if (confirm) {
      const ocupado = {
        title: 'Ocupado',
        start: start,
        end: end,
        allDay: slotInfo.action == 'select'
      }


      setEventos(prevState => [...prevState, ocupado])
    }


  }


  const handleDoubleClickEvent = (eventToDelete: RBCEvent) => {
    const confirm = window.confirm("¿Eliminar este evento?")

    if (confirm) {
      setEventos(prevState => prevState.filter(event =>
        !(isEqual(event.start, eventToDelete.start)
          && isEqual(event.end, eventToDelete.end)
          && event.title === eventToDelete.title)))
    }


  }


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
        localizer={localizer}
        selectable
        events={eventos}
        onDoubleClickEvent={handleDoubleClickEvent}
        onSelectSlot={handlerSelectSlot}
        eventPropGetter={eventStylegetter}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '700px', backgroundColor: "white", marginTop: 150 }}
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

