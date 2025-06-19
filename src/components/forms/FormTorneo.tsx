'use client'

import React, { FormEvent, useState } from "react";

import { TorneoStore } from "@/utils/zustand/torneos";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import { useTorneos } from "../hooks/useTorneos";
import './forms.css'
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function FormTorneos() {

  const { setTorneo, torneo, crearTorneo, image, setImage,error,loading } = useTorneos()
  const router = useRouter()


  const [imagePreview, setImagePreview] = useState("")



  


  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setImage(file);
    setImagePreview(URL.createObjectURL(file))
  };
  return (
    <form onSubmit={crearTorneo}>


      <label>Nombre</label>
      <input
        name="namePlan"
        required={true}
        value={torneo.nombre}
        onChange={(e) => setTorneo({ ...torneo, nombre: e.target.value })}
      />



      <label>Foto</label>
      <input type="file" required accept='image/*' onChange={handleFileChange} />

      {imagePreview && <img src={imagePreview} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={torneo.nombre} />}


{error && <p className='text-red-500'>{error}</p>}
      <button

        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color='inherit' /> : "Guardar"}
      </button>



    </form>
  );
}
