'use client'

import React, { FormEvent, useState } from "react";

import { TorneoStore } from "@/utils/zustand/torneos";
import { CustomInputFileFoto } from "../CustomInputFileFoto";
import { useTorneos } from "../hooks/useTorneos";
import toast from "react-hot-toast";
import './forms.css'
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function FormTorneos() {

  const { setTorneo, torneo, crearTorneo, image, setImage, } = useTorneos()
  const router = useRouter()
<<<<<<< Updated upstream
  const [imagePreview, setImagePreview] = useState('')
=======
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false)
>>>>>>> Stashed changes


  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault();
    await crearTorneo()
    toast.success("Torneo creado")
    router.back()
    setLoading(false)

  };


  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setImage(file);
    setImagePreview(URL.createObjectURL(file))
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
      <input type="file" required accept='image/*' onChange={handleFileChange} />

      {imagePreview && <img src={imagePreview} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={torneo.nombre} />}



      <button

        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color='inherit' /> : "Guardar"}
      </button>



    </form>
  );
}
