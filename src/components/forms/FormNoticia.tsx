'use client'

import React, { useState } from "react";
import './forms.css'
import { useNoticias } from "../hooks/useNoticias";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

export default function FormNoticia() {
  const { image, setImage, noticia, setNoticia, createNoticia, loading } = useNoticias()
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState('')





  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNoticia()
    toast.success('Noticia creada')
    router.back()

  };

  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setImage(file);
    setImagePreview(URL.createObjectURL(file))
  };


  return (
    <form onSubmit={handleSubmit} >
      <label>Titulo</label>
      <input
        required
        name="titulo"
        value={noticia.titulo}
        onChange={(e) => setNoticia({ ...noticia, titulo: e.target.value })}
      />
      <label>Subtitulo</label>
      <textarea
        required
        name="subtitulo"
        className="outline-none p-4 rounded-md"
        rows={4}
        draggable={false}
        value={noticia.subtitulo}
        onChange={(e) => setNoticia({ ...noticia, subtitulo: e.target.value })}
      />

      <input type="file" required accept='image/*' onChange={handleFileChange} />

      {imagePreview && <img src={imagePreview} className='w-[100px] h-[100px] rounded-full bg-cover' alt={noticia.titulo} />}


      <button
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Crear'}
      </button>

    </form>
  );
}
