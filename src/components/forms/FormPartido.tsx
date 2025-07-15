'use client'

import React from "react";
import { usePartidos } from "../hooks/usePartidos";
import { CircularProgress } from "@mui/material";
import './forms.css';

interface Props {
  equiposParticipantes: any[];
}

export default function FormPartido({ equiposParticipantes }: Props) {
  const { partido, setPartido, createPartido, loading } = usePartidos();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createPartido();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <label>Club Local</label>
        <select
          value={partido.local}
          disabled={equiposParticipantes.length === 0}
          onChange={(e) => setPartido({ ...partido, local: e.target.value })}
          className="p-2 border border-slate-300 rounded-md"
        >
          <option value="">
            {equiposParticipantes.length === 0 ? 'Cargando...' : 'Seleccione un equipo'}
          </option>
          {equiposParticipantes.map((e) => (
            <option key={e?._id} value={e?._id}>{e?.nombre}</option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>Club Visitante</label>
        <select
          value={partido.visitante}
          disabled={equiposParticipantes.length === 0}
          onChange={(e) => setPartido({ ...partido, visitante: e.target.value })}
          className="p-2 border border-slate-300 rounded-md"
        >
          <option value="">
            {equiposParticipantes.length === 0 ? 'Cargando...' : 'Seleccione un equipo'}
          </option>
          {equiposParticipantes.map((e) => (
            <option key={e?._id} value={e?._id}>{e?.nombre}</option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>Tipo</label>
        <select
          value={partido.tipo}
          onChange={(e) => setPartido({ ...partido, tipo: e.target.value })}
          className="p-2 border border-slate-300 rounded-md"
        >
          <option value="">Seleccione el tipo</option>
          <option value="clasificacion">Clasificación</option>
          <option value="cuartos">Cuartos de Final</option>
          <option value="octavos">Octavos de Final</option>
          <option value="final">Final</option>
        </select>
      </div>

      <div className="input-group">
        <label>Estadio</label>
        <input
          type="text"
          value={partido.estadio}
          onChange={(e) => setPartido({ ...partido, estadio: e.target.value })}
          className="p-2 border border-slate-300 rounded-md"
        />
      </div>

      <div className="input-group">
        <label>Fecha</label>
        <input
          type="date"
          value={partido.fecha}
          onChange={(e) => setPartido({ ...partido, fecha: e.target.value })}
          className="p-2 border border-slate-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="submit-button mt-4"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear'}
      </button>
    </form>
  );
}
