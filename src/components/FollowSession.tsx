'use client'
import React, { useEffect } from 'react'

const FollowSession = () => {

  useEffect(() => {



  },[])
  return (
    <div className='absolute top-0 left-0 bottom-0 w-screen h-screen  flex items-center justify-center bg-black bg-opacity-50 z-[999]'>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-lg font-bold">Sesión expirada</h1>
        <p>Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.</p>
        <button
          onClick={() => { }}
          className=" mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}

export default FollowSession