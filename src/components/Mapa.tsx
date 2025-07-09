'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface Cancha {
  id: string
  nombre: string
  direccion: string
  horario: string
  ubicacion: {
    lat: number
    lng: number
  }
}

const Mapa = () => {
  const refMap = useRef<HTMLDivElement>(null)
  const [canchaSeleccionada, setCanchaSeleccionada] = useState<Cancha | null>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
        version: 'quarterly',
        libraries: ['places'],
      })

      const { Map } = await loader.importLibrary('maps')
      const { AdvancedMarkerElement } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          const map = new Map(refMap.current as HTMLElement, {
            center: userLocation,
            zoom: 15,
            mapId: 'map',
          })

          // 📍 Usuario
          new AdvancedMarkerElement({
            position: userLocation,
            map,
          })

          // 🏟 Canchas simuladas
          const canchas: Cancha[] = [
            {
              id: '1',
              nombre: 'Cancha Los Prados',
              direccion: 'Av. Central 123',
              horario: '8:00 - 22:00',
              ubicacion: { lat: userLocation.lat + 0.001, lng: userLocation.lng + 0.001 },
            },
            {
              id: '2',
              nombre: 'Cancha El Mirador',
              direccion: 'Calle 45',
              horario: '7:00 - 23:00',
              ubicacion: { lat: userLocation.lat - 0.001, lng: userLocation.lng + 0.002 },
            },
          ]

          // ⚽ Crear icono
          const ballIcon = document.createElement('div')
          ballIcon.innerHTML = '⚽'
          ballIcon.style.fontSize = '24px'
          ballIcon.style.cursor = 'pointer'

          canchas.forEach((cancha) => {
            const marker = new AdvancedMarkerElement({
              position: cancha.ubicacion,
              map,
              content: ballIcon.cloneNode(true),
            })

            marker.addListener('click', () => {
              setCanchaSeleccionada(cancha)
            })
          })
        },
        (error) => {
          console.error('Error ubicación:', error)
        }
      )
    }

    initMap()
  }, [])

  return (
    <>
      <div ref={refMap} className="w-full h-screen" />

      {/* 🪟 Modal */}
      {canchaSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px]">
            <h2 className="text-xl font-bold mb-2">{canchaSeleccionada.nombre}</h2>
            <p><strong>Dirección:</strong> {canchaSeleccionada.direccion}</p>
            <p><strong>Horario:</strong> {canchaSeleccionada.horario}</p>

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setCanchaSeleccionada(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Mapa
