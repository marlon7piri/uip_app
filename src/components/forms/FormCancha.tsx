'use client'

import {
  ParkingCircle,
  Wifi,
  ShowerHead,
  Bath,
  Utensils,
  CheckCircle,
  Home,
  X
} from 'lucide-react'
import React from 'react'
import { useCancha } from '../hooks/useCancha'
import { CircularProgress } from '@mui/material'
import './forms.css'

const comodidades = [
  { label: "Restaurante", icono: <Utensils size={16} className="text-sky-600" /> },
  { label: "Estacionamiento gratis", icono: <ParkingCircle size={16} className="text-sky-600" /> },
  { label: "Wifi", icono: <Wifi size={16} className="text-sky-600" /> },
  { label: "Baños", icono: <Bath size={16} className="text-sky-600" /> },
  { label: "Duchas", icono: <ShowerHead size={16} className="text-sky-600" /> },
]

export const FormularioCancha = ({ closeModal }: { closeModal: () => void }) => {
  const { cancha, setCancha, loading, createCancha, handlerComodidades } = useCancha()

  return (
    <form
      onSubmit={createCancha}
      className="form-container"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Home className="text-sky-600" size={24} />
          Información de la cancha
        </h2>
        <button type="button" onClick={closeModal}>
          <X size={24} color="red" />
        </button>
      </div>

      <div className="input-group">
        <label>Nombre de la cancha</label>
        <input
          type="text"
          value={cancha.nombre}
          onChange={(e) => setCancha({ ...cancha, nombre: e.target.value })}
        />
      </div>

      <div className="input-group">
        <label>Dirección</label>
        <input
          type="text"
          value={cancha.direccion}
          onChange={(e) => setCancha({ ...cancha, direccion: e.target.value })}
        />
      </div>

      <div className="input-group">
        <label>Precio por hora</label>
        <input
          type="number"
          value={cancha.precioPorHora}
          onChange={(e) => setCancha({ ...cancha, precioPorHora: Number(e.target.value) })}
        />
      </div>

      <div className="input-group">
        <label>WhatsApp</label>
        <input
          type="text"
          value={cancha.telefono}
          onChange={(e) => setCancha({ ...cancha, telefono: e.target.value })}
        />
      </div>

      <div className="input-group">
        <label>Yappy</label>
        <input
          type="text"
          value={cancha.yappy || ""}
          onChange={(e) => setCancha({ ...cancha, yappy: e.target.value })}
        />
      </div>

      <div className="input-group">
        <label className="font-medium">Comodidades disponibles</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
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

      <button type="submit" className="submit-button mt-4">
        {loading ? <CircularProgress size={24} color="inherit" /> : (
          <>
            <CheckCircle size={20} /> Crear cancha
          </>
        )}
      </button>
    </form>
  )
}
