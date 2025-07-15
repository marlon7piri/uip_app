'use client'

import {
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { useEquipos } from "../hooks/useEquipos";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useTorneos } from "../hooks/useTorneos";
import './forms.css';

export default function FormRegistroTorneo() {
  const { equiposRegistrados, setEquiposRegistrados, registrarEquiposTorneos } = useTorneos();
  const { equipos } = useEquipos();
  const router = useRouter();
  const search = useSearchParams();
  const idTorneo = search.get('idTorneo');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await registrarEquiposTorneos(idTorneo);
    toast.success('Registro creado');
    router.back();
    setLoading(false);
  };

  const registrarEquipos = (e: any) => {
    const equipo = e.target.value;
    const exist = equiposRegistrados.find(item => item._id === equipo._id);
    if (!exist) {
      setEquiposRegistrados(prev => [...prev, equipo]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <label className="text-xl">Equipos</label>
        <Select
          fullWidth
          defaultValue=""
          onChange={registrarEquipos}
        >
          {equipos.map((e) => (
            <MenuItem key={e._id} value={e}>
              {e.nombre}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="input-group">
        {equiposRegistrados.length === 0 ? (
          <p className="text-slate-500">No hay equipos registrados</p>
        ) : (
          equiposRegistrados.map((e) => (
            <p key={e._id} className="text-slate-700 font-medium">
              {e.nombre}
            </p>
          ))
        )}
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear'}
      </button>
    </form>
  );
}
