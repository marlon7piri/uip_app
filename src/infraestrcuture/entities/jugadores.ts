export interface Jugadores {
  _id: string;
  nombre: string;
  apellido: string;
  edad: number;
  estatura: number;
  foto: string;
  club: Club;
}

interface Club {
  nombre: string;
  logo: string;
}
