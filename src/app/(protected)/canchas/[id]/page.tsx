'use client'
import { getSession } from '@/actions/get-session'
import { CanchaResponse } from '@/infraestrcuture/entities/canchas'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, CalendarClock, DollarSign, Wifi, ParkingCircle, ShowerHead, Bath, Utensils, CalendarPlus } from 'lucide-react'
import { Loader } from '@googlemaps/js-api-loader'
import Link from 'next/link'

const page = () => {
  const params = useParams()
  const [cancha, setCancha] = useState<CanchaResponse | null>(null)

  useEffect(() => {
    const fetchCancha = async () => {
      try {
        const session = await getSession()

        if (session?.user) {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cancha/${params?.id}`, {
            headers: {
              token: session?.token
            }
          })
          setCancha(res.data)
        }

      } catch (error) {
        console.error("Error fetching cancha", error)
      }
    }

    fetchCancha()
  }, [params])

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initmap = async () => {
      if (!cancha) return

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
        version: 'quarterly',
      })


      const { Map } = await loader.importLibrary('maps')
      const { AdvancedMarkerElement } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

      const map = new Map(mapRef.current as HTMLElement, {
        center: {
          lat: cancha.ubicacion.coordinates[1],
          lng: cancha.ubicacion.coordinates[0],
        },
        zoom: 13,
        mapId: 'map',
      })

      new AdvancedMarkerElement({
        map,
        position: {
          lat: cancha.ubicacion.coordinates[1],
          lng: cancha.ubicacion.coordinates[0],
        },
        title: cancha.nombre,
      })
    }
    initmap()
  }, [cancha])

  if (!cancha) {
    return <p className="p-8 text-center text-gray-500">Cargando cancha...</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 bg-white shadow-md rounded-xl">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Imagen */}
        <img
          src={cancha.imagenUrl || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
          alt={`Imagen de ${cancha.nombre}`}
          className="w-full h-64 object-cover rounded-lg"
        />

        {/* Info principal */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{cancha.nombre}</h2>
            <p className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="w-5 h-5" />
              {cancha.direccion}
            </p>
            <p className="flex items-center gap-2 text-gray-600 mb-1">
              <Phone className="w-5 h-5" />
              {cancha.telefono || 'No disponible'}
            </p>
            <p className="flex items-center gap-2 text-gray-600 mb-1">
              <CalendarClock className="w-5 h-5" />
              {cancha.horario}
            </p>
            <p className="flex items-center gap-2 text-gray-600 mb-1">
              <DollarSign className="w-5 h-5" />
              {cancha.precioPorHora ? `$${cancha.precioPorHora} / hora` : 'Precio no disponible'}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Tipo:</span> {cancha.tipo}
            </p>
          </div>

          {/* Coordenadas */}
          <div className="text-sm text-gray-500 mt-4">
            <p>
              <strong>Ubicación:</strong> lat {cancha.ubicacion.coordinates[1]}, lng {cancha.ubicacion.coordinates[0]}
            </p>
          </div>

          {/* Coordenadas */}
          <Link
            href={`/canchas/reservar/${cancha._id}`}
            className="w-max mt-2 inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all duration-200"
          >
            <CalendarPlus className="w-4 h-4" />
            Reservar
          </Link>
        </div>
      </div>

      {/* Comodidades */}
      {cancha.comodidades?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Comodidades</h3>
          <div className="flex flex-wrap gap-3">
            {cancha?.comodidades?.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full shadow-sm"
              >
                {comodidadIcon(item)}
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Mapa de ubicación */}
          {/* <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">Ubicación en el mapa</h3>
            <div ref={mapRef} className="w-full h-64 rounded-lg border shadow-sm" />
          </div> */}
        </div>



      )}
    </div>

  )
}

// ✅ Iconos personalizados por comodidad
function comodidadIcon(nombre: string) {
  switch (nombre) {
    case 'Restaurante':
      return <Utensils className="w-4 h-4" />
    case 'Wifi':
      return <Wifi className="w-4 h-4" />
    case 'Baños':
      return <Bath className="w-4 h-4" />
    case 'Duchas':
      return <ShowerHead className="w-4 h-4" />
    case 'Estacionamiento gratis':
      return <ParkingCircle className="w-4 h-4" />
    default:
      return null
  }
}

export default page
