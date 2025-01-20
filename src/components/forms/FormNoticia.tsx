'use client'

import React, { useState } from "react";
import './forms.css'
import { useNoticias } from "../hooks/useNoticias";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FormNoticia() {
  const { image, setImage, noticia, setNoticia, createNoticia } = useNoticias()
  const router = useRouter()





  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNoticia()
    toast.success('Noticia creada')
    router.back()

  };

  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };


  return (
    <form onSubmit={handleSubmit} >
      <label>Titulo</label>
      <input
        name="titulo"
        value={noticia.titulo}
        onChange={(e) => setNoticia({ ...noticia, titulo: e.target.value })}
      />
      <label>Subtitulo</label>
      <textarea
        name="subtitulo"
        className="outline-none p-4 rounded-md"
        rows={4}
        draggable={false}
        value={noticia.subtitulo}
        onChange={(e) => setNoticia({ ...noticia, subtitulo: e.target.value })}
      />

      <input type="file" accept='image/*' onChange={handleFileChange} />

      {image && <img src={image} className='w-[100px] h-[100px] rounded-full bg-cover ' alt={noticia.titulo} />}


      <button
        type="submit"
      >
        Crear
      </button>

    </form>
  );
}
