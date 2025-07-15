import { getSession } from "@/actions/get-session"
import axios from "axios"
import { isEqual } from "date-fns"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { SlotInfo ,Event as RBCEvent} from "react-big-calendar"



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
  
]
// Tipo para eventos
interface EventType {
  title: string
  start: Date
  end: Date
  allDay?: boolean
}
export const useReservas = ()=>{

const [eventos, setEventos] = useState<EventType[]>([])
const params = useSearchParams()
const [loading, setLoading] = useState(false)



  const isDateConflict = (start: Date, end: Date) => {
    return eventos.some(event => isEqual(event.start, start) && isEqual(event.end, end))
  }
  const handlerSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end } = slotInfo

    if (isDateConflict(start, end)) {
      alert('Esta fecha ya está ocupada.')
      return
    }


    //Aqui abriremos el modal

    const confirm = window.confirm("¿Marcar esta fecha como ocupada?")

    if (confirm) {
      const ocupado = {
        title: 'Ocupado',
        start: start,
        end: end,

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

  

 

    return {
eventos,setEventos,loading,setLoading,handleDoubleClickEvent,handlerSelectSlot,
    }
}