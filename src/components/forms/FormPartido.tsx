'use client'

import React from "react";
;
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { usePartidos } from "../hooks/usePartidos";
import './forms.css'


interface Props {
  equiposParticipantes: any[]
}

export default function FormPartido({ equiposParticipantes }: Props) {


  const { partido, setPartido, createPartido } = usePartidos()



  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPartido()

  };





  return (
    <form onSubmit={handleSubmit} className="w-[600px] h-[300px]  m-auto overflow-y-scroll ">

      <label>Club Local</label>

      <select
        value={partido.local}

        onChange={(e) => setPartido({ ...partido, local: e.target.value })}>
        <option value={''} ></option>
        {equiposParticipantes.map((e) => {
          return <option key={e?._id} value={e?._id} >

            {e?.nombre}</option>



        })}

      </select>
      <label>Club Visitante</label>

      <select
        value={partido.visitante}

        onChange={(e) => setPartido({ ...partido, visitante: e.target.value })}>
        <option value={''} ></option>
        {equiposParticipantes.map((e) => {
          return <option key={e?._id} value={e?._id} >

            {e?.nombre}</option>



        })}

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
        Crear
      </button>






    </form >
  );
}
