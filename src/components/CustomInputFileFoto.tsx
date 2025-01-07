'use client'
import React from 'react'
import { useState } from "react";






interface Props {
  onChange: () => void;
  value?: string
}

export const CustomInputFileFoto = ({ onChange, value }: Props) => {
  const [file, setFile] = useState('');
  const [imagen, setImagen] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (event: any,) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {


      return;
    }



    setFile(selectedFile);
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)


    reader.onloadend = async () => {
      /* @ts-ignore */
      const resizedBase64 = await resizeBase64Image(reader.result, 800, 600);


      setLoading(true);
      setError('');

      setImagen(resizedBase64)
      /* @ts-ignore */
      onChange(resizedBase64)

      try {

        setLoading(false)



      } catch (error) {

      }

    }

  };

  const resizeBase64Image = (base64Str: string, maxWidth: number, maxHeight: number) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calcular el nuevo tamaño manteniendo la relación de aspecto
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Dibujar la imagen redimensionada en el canvas sin alterar la transparencia
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Asegura que el lienzo sea transparente
        ctx.drawImage(img, 0, 0, width, height);
      }

       
        // Convertir el canvas a base64
        const resizedBase64 = canvas.toDataURL('image/png', 0.5); // Puedes ajustar la calidad de la compresión (0.7 es el 70% de calidad)
        resolve(resizedBase64);
      };
    });
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />

      {loading && (<span>Cargando...</span>)}
      {error && (<span>{error}</span>)}
    </>

  )
}



