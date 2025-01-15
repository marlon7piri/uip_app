'use client'

import React, { useEffect, } from "react";
import { useSearchParams } from "next/navigation";

import { usePartidos } from "../hooks/usePartidos";
import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import './forms.css'

interface Props {
  jugadores: Jugadores[];

}

export default function FormResultadoPartidos({ jugadores }: Props) {


  const { resultadoPartido, setResultadoPartido, getEquiposPorPartido, evaluarPartido, loading } = usePartidos()
  const search = useSearchParams()

  const local = search.get('idLocal')
  const visitante = search.get('idVisitante')
  const nombreLocal = search.get('nombreLocal')
  const nombreVisitante = search.get('nombreVisitante')


  const handleSubmit = async (e) => {
    e.preventDefault();
    evaluarPartido()

  };


  const handlerGoleadores = (e) => {

    const id = e.target.value
    const player = jugadores.find(item => item._id == id)

    setResultadoPartido((prevState) => {

      const { goleadores } = prevState

      const new_goleador = [...goleadores, { ids: player._id, nombre: player.nombre + " " + player.apellido }]

      return { ...prevState, goleadores: new_goleador }



    })


  }
  const handlerAsistentes = (e) => {


    const id = e.target.value
    const player = jugadores.find(item => item._id == id)

    setResultadoPartido((prevState) => {
      const { asistentes } = prevState

      const new_asistente = [...asistentes, { ids: player._id, nombre: player.nombre + " " + player.apellido }]

      return { ...prevState, asistentes: new_asistente }






    })
  }


  useEffect(() => {
    getEquiposPorPartido(local, visitante)

  }, [])


  return (
    <form onSubmit={handleSubmit}>
      <label>Es Empate?</label>

      <select
        value={resultadoPartido.is_draw}

        onChange={(e) => setResultadoPartido({ ...resultadoPartido, is_draw: e.target.value })}>
        <option value={true} >Si</option>
        <option value={false} >No</option>





      </select>


      <label>Goles del {nombreLocal}</label>

      <input
        type="number"
        value={resultadoPartido.goles_local}

        onChange={(e) => setResultadoPartido({ ...resultadoPartido, goles_local: parseInt(e.target.value) })} />


      <label>Goles del {nombreVisitante}</label>

      <input
        type="number"
        value={resultadoPartido.goles_visitante}

        onChange={(e) => setResultadoPartido({ ...resultadoPartido, goles_visitante: parseInt(e.target.value) })} />


      <label>Asistencias del {nombreLocal}</label>

      <input
        type="number"
        value={resultadoPartido.asistencias_local}

        onChange={(e) => setResultadoPartido({ ...resultadoPartido, asistencias_local: parseInt(e.target.value) })} />


      <label>Asistencias del {nombreVisitante}</label>

      <input
        type="number"
        value={resultadoPartido.asistencias_visitantes}

        onChange={(e) => setResultadoPartido({ ...resultadoPartido, asistencias_visitantes: parseInt(e.target.value) })} />



      <label>Goleadores</label>

      <select
        value={resultadoPartido.goleadores}

        onChange={handlerGoleadores}>
        <option ></option>
        {jugadores?.map(elem => {
          return <option key={elem._id} value={elem._id}>{elem.nombre + " " + elem.apellido}</option>

        })}





      </select>
      {resultadoPartido.goleadores.map((e) => <p className="text-slate-50">{e.nombre}</p>)}
      <label>Asistentes</label>

      <select
        value={resultadoPartido.asistentes}

        onChange={handlerAsistentes}>
        <option ></option>

        {jugadores?.map(elem => {
          return <option key={elem._id} value={elem._id} >{elem.nombre + " " + elem.apellido}</option>

        })}





      </select>
      {resultadoPartido.asistentes.map((e) => <p className="text-slate-50">{e.nombre}</p>)}




      <button
        type="submit"
      >
        {loading ? 'Cargando...' : 'Evaluar Partido'}
      </button>






    </form >
  );
}
