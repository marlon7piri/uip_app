'use client'

import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import './forms.css'

export default function FormOferta() {
  const { data: session } = useSession();
  const params = useParams()



  const [oferta, setOferta] = useState({
    descripcion: '',
    monto: '',
    author: session?.user?.id,
    jugador: params?.idPlayer
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL + '/ofertas/create'}`, oferta, {
      headers: {
        token: session?.token
      }
    });
  };



  return (
    <form onSubmit={handleSubmit} >
          <label>Descripcion</label>
          <input
            name="namePlan"
            value={oferta.descripcion}
            onChange={(e) => setOferta({ ...oferta, descripcion: e.target.value })}
          />
          <label>Monto</label>
          <input
            type='number'
            name="namePlan"
            value={oferta.monto}
            onChange={(e) => setOferta({ ...oferta, monto: e.target.value })}
          />



          <button
            type="submit"
          >
            Hacer Oferta
          </button>

    </form>
  );
}
