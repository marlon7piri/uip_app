'use client'

import React, { FormEvent, useEffect, useState } from "react";
import { useEquipos } from "../hooks/useEquipos";
import './forms.css';
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";

export default function FormEquipo() {
  const {
    equipo,
    setEquipo,
    createEquipo,
    editarEquipo,
    setImage,
    image,
    isloading,
    setIsloading
  } = useEquipos();

  const [imageSelected, setImageSelected] = useState('');
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const search = useSearchParams();
  const idEquipo = search.get('idEquipo') || null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!idEquipo) {
      await createEquipo();
    } else {
      await editarEquipo(idEquipo);
    }
  };

  // Manejar cambio de archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImageSelected(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (idEquipo) {
      const loadEquipo = async () => {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos/${idEquipo}`, {
          headers: {
            token: session?.token || ''
          }
        });
        const data = await res.json();
        setEquipo({ ...data });
        setImageSelected(data.logo);
        setLoading(false);
      };
      loadEquipo();
    }
  }, [idEquipo]);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <label>Nombre</label>
        <input
          name="namePlan"
          type="text"
          required
          disabled={isloading}
          value={equipo.nombre}
          onChange={(e) => setEquipo({ ...equipo, nombre: e.target.value })}
          className="p-2 border border-slate-300 rounded-md"
        />
      </div>

      <div className="input-group">
        <label>Logo</label>
        <input
          type="file"
          required
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 rounded-md bg-white"
        />
      </div>

      {imageSelected && (
        <div className="input-group">
          <img
            src={imageSelected}
            alt={equipo.nombre}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
        </div>
      )}

      <button type="submit" className="submit-button mt-4" disabled={isloading}>
        {isloading
          ? <CircularProgress size={24} color="inherit" />
          : idEquipo ? 'Editar' : 'Guardar'}
      </button>
    </form>
  );
}
