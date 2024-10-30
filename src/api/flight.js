const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const getFlightFn = async () => {
  const res = await fetch(`${BACKEND_URL}/flights`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Ocurrio un error al obtener los vuelos");
  }
  return data;
};

export const getflightSelectedFn = async (id) => {
  const res = await fetch(`${BACKEND_URL}/flights/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Ocurrio un error al obtener los datos del vuelo selecccionado");
  }
  return data;
};