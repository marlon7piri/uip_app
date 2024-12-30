'use client'

import React  from "react";
import { useEquipos } from "../hooks/useEquipos";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import { EquipoStore } from "@/utils/zustand/equipos";
import './forms.css'

export default function FormEquipo() {
  const saveImageEquipo = EquipoStore(state => state.saveImageEquipo);
  const currentImageEquipo = EquipoStore(state => state.currentImageEquipo);
  const { equipo, setEquipo, createEquipo } = useEquipos()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEquipo()
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
          <CustomInputFileFoto
            onChange={saveImageEquipo}
          />
          <img src={currentImageEquipo} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={'imagen de un equipo de futbol'} />


          <button
            type="submit"
          >
            Guardar
          </button>
         
    </form>
  );
}
