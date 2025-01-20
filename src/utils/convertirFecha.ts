export const convertirFecha = (fecha: Date) => {
  return new Date(fecha).toLocaleDateString("es-Es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
