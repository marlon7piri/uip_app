import { useEffect, useState } from "react";
import { getSession } from "@/actions/get-session";
import { Noticias } from "@/infraestrcuture/entities/noticias";
import { uploadFile } from "@/utils/imagenes";

interface Type {
  titulo: string;
  subtitulo: string;
  foto: string;
}
export const useNoticias = () => {
  const [noticias, setNoticias] = useState<Noticias[]>([]);
  const [noticia, setNoticia] = useState<Type>({
    titulo: "",
    subtitulo: "",
    foto: "",
  });
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  useEffect(() => {
    getNoticias();
  }, []);

  const getNoticias = async () => {
    const session = await getSession();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/noticias/list`,
      {
        headers: {
          token: session?.token,
        },
      }
    );
    const data = await res.json();
    setNoticias(data);
  };

  const createNoticia = async () => {
    try {
      setLoading(true);
      const img = await uploadFile(image);
      const noticianew = {
        ...noticia,
        foto: img,
      };

      const session = await getSession();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/noticias/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: session?.token,
          },
          body: JSON.stringify(noticianew),
        }
      );
    } catch (error) {
      setLoading(true);
      throw new Error("Error creando noticia", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    noticias,
    image,
    setImage,
    createNoticia,
    noticia,
    setNoticia,
    loading,
  };
};
