"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

// Define tu configuración de Cloudinary (asegúrate de haberla configurado previamente)
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const   CloudinaryFile =({ setImage, image }: { setImage: any, image: any })=> {

    // Configuración del Widget de Carga
    const handleUploadSuccess = (result) => {
        // El resultado contiene la URL pública de la imagen cargada
        setImage(result.info.secure_url);
    };

    return (
        <div>
            <h1>Selecciona una Imagen para Cargar</h1>
            <CldUploadWidget
                cloudName={cloudName}
                uploadPreset="uip_preset" // Asegúrate de tener un preset de carga configurado
                onSuccess={handleUploadSuccess}
                onFailure={(error) => console.error(error)}
                buttonText="Seleccionar Imagen"
                sources={["local", "url", "camera"]} // Puedes elegir de dónde cargar la imagen (local, URL o cámara)
                multiple={false} // Si deseas permitir múltiples selecciones
            >
                {({ open }) => () => { return (<button onClick={() => open()}>Open</button>) }}
            </CldUploadWidget>
            {image && (
                <div>
                    <h2>Imagen Seleccionada</h2>
                    <img src={image} alt="Imagen cargada" width="300" />
                </div>
            )}
        </div>
    );
}
