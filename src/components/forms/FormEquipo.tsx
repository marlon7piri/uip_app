'use client'

import React, { useEffect, useState } from "react";
import { useEquipos } from "../hooks/useEquipos";
import './forms.css'
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function FormEquipo() {

  const { equipo, setEquipo, createEquipo, editarEquipo, setImage, image } = useEquipos()
  const [imageSelected, setImageSelected] = useState('')
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const search = useSearchParams()
  const idEquipo = search.get('idEquipo') || null

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!idEquipo) {

      await createEquipo()
    } else {
      await editarEquipo(idEquipo)
    }
  };

  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]

    setImage(file);
    setImageSelected(URL.createObjectURL(file))
  };


  useEffect(() => {
    if (idEquipo) {
      const loadEquipo = async () => {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos/${idEquipo}`, {
          headers: {
            token: session?.token
          }
        })
        const data = await res.json()
        setEquipo({ ...data })
        setImageSelected(data.logo)
        setLoading(false)
      }
      loadEquipo()
    }

  }, [idEquipo])

  return (
    <form onSubmit={handleSubmit}>

      <label>Nombre</label>
      <input
        name="namePlan"
        required
        disabled={loading}
        value={equipo.nombre}
        onChange={(e) => setEquipo({ ...equipo, nombre: e.target.value })}
      />

      <label>Logo</label>
      <input type="file" required accept='image/*' onChange={handleFileChange} />

      {imageSelected && <img src={imageSelected} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={equipo.nombre} />}


      <button
        type="submit"
        disabled={loading}
      >
        {idEquipo ? "Editar" : "Guardar"}
      </button>

    </form>
  );
}
