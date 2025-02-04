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


  useEffect(() => {
    getEquiposPorPartido(local, visitante)

  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    evaluarPartido()

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

      <div className="  relative">
        <ul className="w-full p-4 rounded-md bg-slate-50  h-[100px] absolute top-0  left-0 overflow-y-scroll">


          {jugadores?.map(elem => {
            return <li key={elem._id} value={elem._id} onClick={() => handlerGoleadores(elem._id)} className="hover:bg-slate-200 cursor-pointer p-1 rounded-md">{elem.nombre + " " + elem.apellido}</li>

          })}
        </ul>
      </div>




      <ol className="mt-24">
        {resultadoPartido.goleadores.map((e, index) => {
          return <div className="flex justify-between" key={`${e.ids}-${index}`}>
            <li className="text-slate-50">{e?.nombre}</li>
            <span className="w-8 h-8 flex justify-center items-center bg-red-500 hover:bg-red-900  cursor-pointer p-2 rounded-full text-slate-50 " onClick={() => deleteGoleador(e.ids)}>x</span>
          </div>
        })}


      </ol>
      <label>Asistentes</label>
      <div className="  relative">
        <ul className="w-full p-4 rounded-md bg-slate-50  h-[100px] absolute top-0  left-0 overflow-y-scroll">


        {jugadores?.map(elem => {
          return <li key={elem._id} value={elem._id} onClick={() => handlerAsistentes(elem._id)} className="hover:bg-slate-200 cursor-pointer p-1 rounded-md">{elem.nombre + " " + elem.apellido}</li>

        })}
        </ul>
      </div>

     
      <ol className="mt-24">
        {resultadoPartido.asistentes.map((e, index) => {
          return <div className="flex justify-between" key={`${e.ids}-${index}`}>
            <li className="text-slate-50">{e?.nombre}</li>
            <span className="w-8 h-8 flex justify-center items-center bg-red-500 hover:bg-red-900  cursor-pointer p-2 rounded-full text-slate-50 " onClick={() => deleteAsistente(e.ids)}>x</span>
          </div>
        })}


      </ol>

      <label>Tarjetas Amarillas</label>
      <div className="  relative">
        <ul className="w-full p-4 rounded-md bg-slate-50  h-[100px] absolute top-0  left-0 overflow-y-scroll">

        {jugadores?.map(elem => {
          return <li key={elem._id} value={elem._id} onClick={() => handlerAmarillas(elem._id)} className="hover:bg-slate-200 cursor-pointer p-1 rounded-md">{elem.nombre + " " + elem.apellido}</li>

        })}
        </ul>
      </div>
      <ol className="mt-24">
        {resultadoPartido.tarjetas_amarillas.map((e, index) => {
          return <div className="flex justify-between" key={`${e.ids}-${index}`}>
            <li className="text-slate-50">{e?.nombre}</li>
            <span className="w-8 h-8 flex justify-center items-center bg-red-500 hover:bg-red-900  cursor-pointer p-2 rounded-full text-slate-50 " onClick={() => deleteAmarillas(e.ids)}>x</span>
          </div>
        })}


      </ol>
    

      <label>Tarjetas Rojas</label>
      <div className="  relative">
        <ul className="w-full p-4 rounded-md bg-slate-50  h-[100px] absolute top-0  left-0 overflow-y-scroll">

        {jugadores?.map(elem => {
          return <li key={elem._id} value={elem._id} onClick={() => handlerRojas(elem._id)} className="hover:bg-slate-200 cursor-pointer p-1 rounded-md">{elem.nombre + " " + elem.apellido}</li>

        })}
        </ul>
      </div>

      <ol className="mt-24">
        {resultadoPartido.tarjetas_rojas.map((e, index) => {
          return <div className="flex justify-between" key={`${e.ids}-${index}`}>
            <li className="text-slate-50">{e?.nombre}</li>
            <span className="w-8 h-8 flex justify-center items-center bg-red-500 hover:bg-red-900  cursor-pointer p-2 rounded-full text-slate-50 " onClick={() => deleteRojas(e.ids)}>x</span>
          </div>
        })}


      </ol>
     
      <button
        type="submit"
      >
        {loading ? 'Cargando...' : 'Evaluar Partido'}
      </button>






    </form >
  );
}
