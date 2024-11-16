import { useState } from "react";

export const useUploadPicture = () => {
  const [file, setFile] = useState(null);
  const [imagen, setImagen] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event: any, onChange: () => void) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setError("No file selected");

      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onloadend = async () => {
      const resizedBase64 = await resizeBase64Image(reader.result, 800, 600);

      setLoading(true);
      setError(null);

      setImagen(resizedBase64);
      onChange(resizedBase64);
      try {
        setLoading(false);
      } catch (error) {}
    };
  };

  const resizeBase64Image = (base64Str, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;

      img.onload = () => {
        const canvas = document.createElement("canvas");
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
        const ctx = canvas.getContext("2d");

        // Dibujar la imagen redimensionada en el canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir el canvas a base64
        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7); // Puedes ajustar la calidad de la compresión (0.7 es el 70% de calidad)
        resolve(resizedBase64);
      };
    });
  };

  return {
    handleFileChange,
    file,
    loading,
    error,
    imagen,
  };
};
