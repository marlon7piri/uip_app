'use client'

import React from "react";
;

import { usePartidos } from "../hooks/usePartidos";
import './forms.css'
import { CircularProgress } from "@mui/material";


interface Props {
  equiposParticipantes: any[]
}

export default function FormPartido({ equiposParticipantes }: Props) {


  const { partido, setPartido, createPartido, loading } = usePartidos()



  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPartido()

  };





  return (
    <form onSubmit={handleSubmit} >

      <label>Club Local</label>

      <select
        value={partido.local}
        disabled={equiposParticipantes.length == 0}
        onChange={(e) => setPartido({ ...partido, local: e.target.value })}>
        <option value={''} >{equiposParticipantes.length == 0 ? 'Cargando...' : 'Seleccione un equipo'}</option>
        {equiposParticipantes.map((e) => {
          return <option key={e?._id} value={e?._id} >

            {e?.nombre}</option>



        })}

      </select>
      <label>Club Visitante</label>

      <select
        value={partido.visitante}
        disabled={equiposParticipantes.length == 0}
        onChange={(e) => setPartido({ ...partido, visitante: e.target.value })}>
        <option value={''} >{equiposParticipantes.length == 0 ? 'Cargando...' : 'Seleccione un equipo'}</option>
        {equiposParticipantes.map((e) => {
          return <option key={e?._id} value={e?._id} >

            {e?.nombre}</option>



        })}

      </select>
      <label>Tipo</label>

      <select
        value={partido.tipo}

        onChange={(e) => setPartido({ ...partido, tipo: e.target.value })}>
        <option value={''} >Seleccione un equipo</option>
        <option value={'clasificacion'} >Clasificacion</option>
        <option value={'cuartos'} >Cuartos de Final</option>
        <option value={'octavos'} >Octavos de Final</option>
        <option value={'final'} >Final</option>


      </select>

      <label>Estadio</label>

      <input
        value={partido.estadio}

        onChange={(e) => setPartido({ ...partido, estadio: e.target.value })} />

      <label>Fecha</label>

      <input
        type="date"
        value={partido.fecha}

        onChange={(e) => setPartido({ ...partido, fecha: e.target.value })} />




      <button
        type="submit"
      >
        {loading ? <CircularProgress size={24} color='inherit' /> : 'Crear'}
      </button>






    </form >
  );
}
