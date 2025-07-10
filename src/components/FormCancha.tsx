'use client'
import {
  ParkingCircle,
  Wifi,
  ShowerHead,
  Bath,
  Utensils,
  CheckCircle,
  Home,
  CircleOff,
} from 'lucide-react'
import React, { FormEvent, useState } from 'react'


const initialCancha = {
  nombre: "Cancha Deportiva San Miguelito",
  direccion: "Calle 15, San Miguelito, Panamá",
  horario: "07:00 - 23:00",
  telefono: "+507 6123-4567",
  precioPorHora: 30,
  tipo: "baloncesto",
  imagenUrl: "https://example.com/cancha-san-miguelito.jpg",
  ubicacion: {
    type: "Point",
    coordinates: [-79.5250, 9.0500]
  },
  comodidades: ["Duchas", "Baños", "Estacionamiento gratis"]
}

export const FormularioCancha = ({ closeModal }: { closeModal: () => void }) => {
  const [cancha, setCancha] = useState(initialCancha)
  const comodidades = [
    {
      label: "Restaurante",
      icono: <Utensils size={16} className="text-sky-600" />,
    },
    {
      label: "Estacionamiento gratis",
      icono: <ParkingCircle size={16} className="text-sky-600 " />,
    },
    {
      label: "Wifi",
      icono: <Wifi size={16} className="text-sky-600" />,
    },
    {
      label: "Baños",
      icono: <Bath size={16} className="text-sky-600" />,
    },
    {
      label: "Duchas",
      icono: <ShowerHead size={16} className="text-sky-600" />,
    }
  ]

  const handlerSubmit = (event: FormEvent) => {
    event.preventDefault()
    alert("Enviando datos...")
    console.log(cancha)
  }


  const handlerComodidades = (e: any) => {

    setCancha((prevState => {
      const exist = prevState?.comodidades?.find(e => e === e.target.value)

      if (!exist) {
        return { ...prevState, comodidades: [...prevState.comodidades, e] }
      }
      return prevState
    }))

  }
  return (
    <form
      onSubmit={handlerSubmit}
      className="max-w-2xl mx-auto mt-[100px] bg-white text-slate-800 p-8 shadow-lg rounded-lg space-y-4"
    >
      <div className='flex justify-between '>
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <Home className="text-sky-600" size={24} />
          Información de la cancha
        </h2>
        <button type='button'
          className=" "
          onClick={closeModal}
        >
          <CircleOff size={24} color='red' />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Nombre de la cancha:</label>
        <input
          type="text"
          value={cancha.nombre}
          onChange={(e) => setCancha({ ...cancha, nombre: e.target.value })}
          className="p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Dirección:</label>
        <input
          type="text"
          value={cancha.direccion}
          onChange={(e) => setCancha({ ...cancha, direccion: e.target.value })}
          className="p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Precio por hora:</label>
        <input
          type="number"
          value={cancha.precioPorHora}
          onChange={(e) => setCancha({ ...cancha, precioPorHora: e.target.value })}
          className="p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">WhatsApp:</label>
        <input
          type="text"
          value={cancha.telefono}
          onChange={(e) => setCancha({ ...cancha, telefono: e.target.value })}
          className="p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Yappy:</label>
        <input
          type="text"
          value={cancha.telefono}
          onChange={(e) => setCancha({ ...cancha, telefono: e.target.value })}
          className="p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div>
        <h3 className="font-semibold mt-4 mb-2">Comodidades disponibles:</h3>
        <div className="grid grid-cols-2 gap-3">
          {comodidades.map((c, index) => (
            <label
              key={index}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                name="comodidades"
                value={c.label}
                onChange={handlerComodidades}
                className="accent-sky-600"
              />
              {c.icono}
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-sky-600 text-white font-semibold py-3 rounded-md hover:bg-sky-700 transition duration-300 flex items-center justify-center gap-2"
      >
        <CheckCircle size={20} />
        Crear cancha
      </button>
    </form>
  )
}
