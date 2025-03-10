'use client'

import React, { useState } from "react";
import { useEquipos } from "../hooks/useEquipos";
import './forms.css'

export default function FormEquipo() {

  const { equipo, setEquipo, createEquipo, setImage, image } = useEquipos()
  const [imageSelected, setImageSelected] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEquipo()
  };

  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    
    setImage(file);
    setImageSelected(URL.createObjectURL(file))
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre</label>
      <input
        name="namePlan"
        required
        value={equipo.nombre}
        onChange={(e) => setEquipo({ ...equipo, nombre: e.target.value })}
      />

      <label>Logo</label>
      <input type="file" required accept='image/*' onChange={handleFileChange} />

      {imageSelected && <img src={imageSelected} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={equipo.nombre} />}


      <button
        type="submit"
      >
        Guardar
      </button>

    </form>
  );
}
