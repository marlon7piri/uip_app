import { getSession } from "@/actions/get-session"
import { authReserva } from "@/utils/zustand/reservas"
import axios from "axios"
import { isEqual } from "date-fns"
import { useSearchParams } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
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
const [reserva, setReserva] = useState<EventType>({
    start:new Date(),
    end:new Date(),
    title:'',
    allDay:false

})
const params = useSearchParams()
const [loading, setLoading] = useState(false)
const openModal = authReserva(state=>state.openModal)


  const isDateConflict = (start: Date, end: Date) => {
    return eventos.some(event => isEqual(event.start, start) && isEqual(event.end, end))
  }
  const handlerSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end } = slotInfo


    

    if (isDateConflict(start, end)) {
      alert('Esta fecha ya está ocupada.')
      return
    }


    
    const confirm = window.confirm("¿Desea hacer una reserva?")

    //Aqui abriremos el modal

    

   if (confirm) {
    setReserva({...reserva,title:reserva.title,start,end})
    openModal()

    


      
    }


  }

  const confirmRserva =(e:FormEvent)=>{
    e.preventDefault()
    setEventos([...eventos,reserva])

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
eventos,reserva,setReserva,setEventos,loading,setLoading,handleDoubleClickEvent,handlerSelectSlot,confirmRserva
    }
}