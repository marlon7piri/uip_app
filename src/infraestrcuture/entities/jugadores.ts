export interface Jugadores {
  nombre: string;
  apellido: string;
  edad: number;
  estatura: number;
  foto: string;
  rol: string;
  email: string;
  estudiante: string;
  valor_mercado: number;
  posicion: string;
  velocidad: number;
  ataque: number;
  defensa: number;
  regate: number;
  club: Club;
  status: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

interface Club {
  nombre: string;
  logo: string;
}
