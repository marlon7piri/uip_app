'use client'

import React, { useState } from "react"
import { useTorneos } from "../hooks/useTorneos"
import './forms.css'
import { CircularProgress } from "@mui/material"

export default function FormTorneos() {
  const { setTorneo, torneo, crearTorneo, image, setImage, error, loading } = useTorneos()
  const [imagePreview, setImagePreview] = useState("")

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  return (
    <form onSubmit={crearTorneo} className="form-container">
      <div className="input-group">
        <label>Nombre</label>
        <input
          type="text"
          name="namePlan"
          required
          value={torneo.nombre}
          onChange={(e) => setTorneo({ ...torneo, nombre: e.target.value })}
        />
      </div>

      <div className="input-group">
        <label>Foto</label>
        <input
          type="file"
          required
          accept="image/*"
          onChange={handleFileChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt={torneo.nombre}
            className="preview-image"
          />
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="submit-button"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Guardar"}
      </button>
    </form>
  )
}
