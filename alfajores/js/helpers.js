export function debounce(funcion, espera) {
  let temporizador;
  return (...argumentos) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => funcion(...argumentos), espera);
  };
}

export const formatearDinero = (numero) => `$${numero.toLocaleString("es-AR")}`;

export const simularEspera = (milisegundos) => new Promise((resolver) => setTimeout(resolver, milisegundos));

export function cargarLista(clave) {
  try {
    const datos = JSON.parse(localStorage.getItem(clave));
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export function guardarEnStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    return false;
  }
  return true;
}
