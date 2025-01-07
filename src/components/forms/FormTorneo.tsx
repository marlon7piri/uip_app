'use client'

import React  from "react";

import { TorneoStore } from "@/utils/zustand/torneos";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import { useTorneos } from "../hooks/useTorneos";
import toast from "react-hot-toast";
import './forms.css'

export default function FormTorneos() {
  const saveImageTorneo = TorneoStore(state => state.saveImageTorneo)
  const currentImageTorneo = TorneoStore(state => state.currentImageTorneo)
  const { setTorneo, torneo, crearTorneo } = useTorneos()


  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearTorneo()
    toast.success("Torneo creado")

  };



  return (
    <form onSubmit={handleSubmit}>
      
        
          <label>Nombre</label>
          <input
            name="namePlan"
           
            value={torneo.nombre}
            onChange={(e) => setTorneo({ ...torneo, nombre: e.target.value })}
          />
     

       
          <label>Foto</label>
          <CustomInputFileFoto
            onChange={saveImageTorneo}
          />
          <img src={currentImageTorneo} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={'imagen del torneo'} />

       

        
          <button
           
            type="submit"
          >
            Guardar
          </button>
          
        
      
    </form>
  );
}
