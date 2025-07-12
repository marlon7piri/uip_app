'use client'
import axios from 'axios'
import {
  ParkingCircle,
  Wifi,
  ShowerHead,
  Bath,
  Utensils,
  CheckCircle,
  Home,
  CircleOff,
  X
} from 'lucide-react'
import React, { FormEvent, useState } from 'react'
import { useCancha } from './hooks/useCancha'
import { CircularProgress } from '@mui/material'


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

export const FormularioCancha = ({ closeModal }: { closeModal: () => void }) => {
  const { cancha, setCancha, loading, createCancha, handlerComodidades } = useCancha()






  return (
    <form
      onSubmit={createCancha}
      className="max-w-2xl mx-auto mt-[100px] bg-white text-slate-800 p-8 shadow-lg rounded-lg space-y-4"
    >
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <Home className="text-sky-600" size={24} />
          Información de la cancha
        </h2>
        <button type='button'
          className=" "
          onClick={closeModal}
        >
          <X size={24} color='red' />
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
          onChange={(e) => setCancha({ ...cancha, precioPorHora: Number(e.target.value) })}
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
                checked={cancha.comodidades?.includes(c.label)}
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
        {!loading ? <><CheckCircle size={20} />
          'Crear cancha'</> : <CircularProgress size={24} color='inherit' />}
      </button>
    </form>
  )
}
