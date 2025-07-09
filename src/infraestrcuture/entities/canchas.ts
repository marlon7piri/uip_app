export interface CanchaResponse {
  ubicacion: Ubicacion;
  _id: string;
  nombre: string;
  direccion: string;
  horario: string;
  telefono: string;
  precioPorHora: number;
  tipo: string;
  imagenUrl: string;
  comodidades: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Ubicacion {
  type: string;
  coordinates: number[];
}
