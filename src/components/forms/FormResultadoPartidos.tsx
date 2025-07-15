'use client'

import React, { FormEvent, useEffect, } from "react";
import { useSearchParams } from "next/navigation";

import { usePartidos } from "../hooks/usePartidos";
import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import './forms.css'
import { CircularProgress } from "@mui/material";

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


  useEffect(() => {
    getEquiposPorPartido(local, visitante)

  }, [])


  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    await evaluarPartido()

  };


  const handlerGoleadores = (e: string) => {

    const id = e
    const player = jugadores.find(item => item._id == id)


    setResultadoPartido((prevState) => {

      const { goleadores } = prevState

      const new_goleador = [...goleadores, { ids: player._id, nombre: player.nombre + " " + player.apellido }]

      return { ...prevState, goleadores: new_goleador }



    })


  }
  const handlerAsistentes = (e) => {


    const id = e
    const player = jugadores.find(item => item._id == id)

    setResultadoPartido((prevState) => {
      const { asistentes } = prevState

      const new_asistente = [...asistentes, { ids: player._id, nombre: player.nombre + " " + player.apellido }]

      return { ...prevState, asistentes: new_asistente }






    })
  }

  const handlerAmarillas = (e) => {


    const id = e
    const player = jugadores.find(item => item._id == id)

    setResultadoPartido((prevState) => {
      const { tarjetas_amarillas } = prevState

      const new_amarillas = [...tarjetas_amarillas, { ids: player._id, nombre: player.nombre + " " + player.apellido }]

      return { ...prevState, tarjetas_amarillas: new_amarillas }






    })
  }

  const handlerRojas = (e) => {


    const id = e
    const player = jugadores.find(item => item._id == id)

    setResultadoPartido((prevState) => {
      const { tarjetas_rojas } = prevState

      const new_rojas = [...tarjetas_rojas, { ids: player._id, nombre: player.nombre + " " + player.apellido }]

      return { ...prevState, tarjetas_rojas: new_rojas }






    })
  }



  const deleteGoleador = (idAEliminar: string) => {


    const res = resultadoPartido.goleadores.filter(i => {
      return i.ids !== idAEliminar
    })

    setResultadoPartido({ ...resultadoPartido, goleadores: res })



  }
  const deleteAsistente = (idAEliminar: string) => {


    const res = resultadoPartido.asistentes.filter(i => {
      return i.ids !== idAEliminar
    })

    setResultadoPartido({ ...resultadoPartido, asistentes: res })



  }
  const deleteAmarillas = (idAEliminar: string) => {


    const res = resultadoPartido.tarjetas_amarillas.filter(i => {
      return i.ids !== idAEliminar
    })

    setResultadoPartido({ ...resultadoPartido, tarjetas_amarillas: res })



  }
  const deleteRojas = (idAEliminar: string) => {


    const res = resultadoPartido.tarjetas_rojas.filter(i => {
      return i.ids !== idAEliminar
    })

    setResultadoPartido({ ...resultadoPartido, tarjetas_rojas: res })



  }
  return (
    <form onSubmit={handleSubmit} className="form-container">
  <div className="input-group">
    <label>¿Es Empate?</label>
    <select
      value={resultadoPartido.is_draw}
      onChange={(e) => setResultadoPartido({ ...resultadoPartido, is_draw: e.target.value })}
    >
      <option value="true">Sí</option>
      <option value="false">No</option>
    </select>
  </div>

  <div className="input-group">
    <label>Goles del {nombreLocal}</label>
    <input
      type="number"
      value={resultadoPartido.goles_local}
      onChange={(e) => setResultadoPartido({ ...resultadoPartido, goles_local: parseInt(e.target.value) })}
    />
  </div>

  <div className="input-group">
    <label>Goles del {nombreVisitante}</label>
    <input
      type="number"
      value={resultadoPartido.goles_visitante}
      onChange={(e) => setResultadoPartido({ ...resultadoPartido, goles_visitante: parseInt(e.target.value) })}
    />
  </div>

  <div className="input-group">
    <label>Asistencias del {nombreLocal}</label>
    <input
      type="number"
      value={resultadoPartido.asistencias_local}
      onChange={(e) => setResultadoPartido({ ...resultadoPartido, asistencias_local: parseInt(e.target.value) })}
    />
  </div>

  <div className="input-group">
    <label>Asistencias del {nombreVisitante}</label>
    <input
      type="number"
      value={resultadoPartido.asistencias_visitantes}
      onChange={(e) => setResultadoPartido({ ...resultadoPartido, asistencias_visitantes: parseInt(e.target.value) })}
    />
  </div>

  {/* Goleadores */}
  <div className="input-group">
    <label>Goleadores</label>
    <div className="player-list">
      <ul className="player-scroll">
        {jugadores.map(j => (
          <li key={j._id} onClick={() => handlerGoleadores(j._id)}>
            {j.nombre} {j.apellido}
          </li>
        ))}
      </ul>
    </div>
    <ol className="player-selected-list">
      {resultadoPartido.goleadores.map((e, index) => (
        <div className="player-selected-item" key={`${e.ids}-${index}`}>
          <li>{e.nombre}</li>
          <span className="badge-remove" onClick={() => deleteGoleador(e.ids)}>x</span>
        </div>
      ))}
    </ol>
  </div>

  {/* Asistentes */}
  <div className="input-group">
    <label>Asistentes</label>
    <div className="player-list">
      <ul className="player-scroll">
        {jugadores.map(j => (
          <li key={j._id} onClick={() => handlerAsistentes(j._id)}>
            {j.nombre} {j.apellido}
          </li>
        ))}
      </ul>
    </div>
    <ol className="player-selected-list">
      {resultadoPartido.asistentes.map((e, index) => (
        <div className="player-selected-item" key={`${e.ids}-${index}`}>
          <li>{e.nombre}</li>
          <span className="badge-remove" onClick={() => deleteAsistente(e.ids)}>x</span>
        </div>
      ))}
    </ol>
  </div>

  {/* Amarillas */}
  <div className="input-group">
    <label>Tarjetas Amarillas</label>
    <div className="player-list">
      <ul className="player-scroll">
        {jugadores.map(j => (
          <li key={j._id} onClick={() => handlerAmarillas(j._id)}>
            {j.nombre} {j.apellido}
          </li>
        ))}
      </ul>
    </div>
    <ol className="player-selected-list">
      {resultadoPartido.tarjetas_amarillas.map((e, index) => (
        <div className="player-selected-item" key={`${e.ids}-${index}`}>
          <li>{e.nombre}</li>
          <span className="badge-remove" onClick={() => deleteAmarillas(e.ids)}>x</span>
        </div>
      ))}
    </ol>
  </div>

  {/* Rojas */}
  <div className="input-group">
    <label>Tarjetas Rojas</label>
    <div className="player-list">
      <ul className="player-scroll">
        {jugadores.map(j => (
          <li key={j._id} onClick={() => handlerRojas(j._id)}>
            {j.nombre} {j.apellido}
          </li>
        ))}
      </ul>
    </div>
    <ol className="player-selected-list">
      {resultadoPartido.tarjetas_rojas.map((e, index) => (
        <div className="player-selected-item" key={`${e.ids}-${index}`}>
          <li>{e.nombre}</li>
          <span className="badge-remove" onClick={() => deleteRojas(e.ids)}>x</span>
        </div>
      ))}
    </ol>
  </div>

  <button type="submit" className="submit-button" disabled={loading}>
    {loading ? <CircularProgress size={24} color="inherit" /> : "Evaluar Partido"}
  </button>
</form>

  );
}
