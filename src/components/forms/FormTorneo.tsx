'use client'

import React, { FormEvent } from "react";

import { TorneoStore } from "@/utils/zustand/torneos";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import { useTorneos } from "../hooks/useTorneos";
import toast from "react-hot-toast";
import './forms.css'
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function FormTorneos() {

  const { setTorneo, torneo, crearTorneo, image, setImage, loading } = useTorneos()
  const router = useRouter()


  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    await crearTorneo()
    toast.success("Torneo creado")
    router.back()

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
        required={true}
        value={torneo.nombre}
        onChange={(e) => setTorneo({ ...torneo, nombre: e.target.value })}
      />



      <label>Foto</label>
      <input type="file"  required accept='image/*' onChange={handleFileChange} />

      {image && <img src={image} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={torneo.nombre} />}



      <button

        type="submit"
      >
        {loading ? <CircularProgress size={24} color='inherit' /> : "Guardar"}
      </button>



    </form>
  );
}
