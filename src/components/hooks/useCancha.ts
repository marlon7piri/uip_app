import { getSession } from "@/actions/get-session";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const initialCancha = {
  nombre: "Cancha Deportiva San Miguelito",
  direccion: "Calle 15, San Miguelito, Panamá",
  horario: "07:00 - 23:00",
  telefono: "+507 6123-4567",
  precioPorHora: 30,
  tipo: "baloncesto",
  imagenUrl: "https://example.com/cancha-san-miguelito.jpg",
  ubicacion: {
    type: "Point",
    coordinates: [-79.525, 9.05],
  },
  comodidades: ["Duchas", "Baños", "Estacionamiento gratis"],
};
export const useCancha = () => {
  const [cancha, setCancha] = useState(initialCancha);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createCancha = async (event: FormEvent) => {
    event.preventDefault();
    const session = await getSession();
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cancha`,
        cancha,
        {
          headers: {
            token: session?.token,
          },
        }
      );
      console.log(res.status);
      if (res.status == 201) {
        toast.success("Cancha creada");
        router.push("/canchas");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handlerComodidades = (e: any) => {
    const value = e.target.value;

    setCancha((prevState) => {
      const comodidades = prevState?.comodidades || [];
      const exist = comodidades.includes(value);

      return {
        ...prevState,
        comodidades: exist
          ? comodidades.filter((y) => y !== value)
          : [...comodidades, value],
      };
    });
  };

  return {
    cancha,
    setCancha,
    loading,
    handlerComodidades,
    createCancha,
  };
};
