'use client'

import React from "react";
import { useEquipos } from "../hooks/useEquipos";
import './forms.css'

export default function FormEquipo() {

  const { equipo, setEquipo, createEquipo, setImage, image } = useEquipos()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEquipo()
  };

  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre</label>
      <input
        name="namePlan"
        value={equipo.nombre}
        onChange={(e) => setEquipo({ ...equipo, nombre: e.target.value })}
      />

      <label>Logo</label>
      <input type="file" accept='image/*' onChange={handleFileChange} />

      {image && <img src={image} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={equipo.nombre} />}


      <button
        type="submit"
      >
        Guardar
      </button>

    </form>
  );
}
