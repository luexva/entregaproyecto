import { cargarLista, guardarEnStorage } from "./helpers.js";

const CLAVE_FAVORITOS = "alfajores-favoritos";
let favoritos = cargarLista(CLAVE_FAVORITOS);

export const esFavorito = (id) => favoritos.includes(id);

export function alternarFavorito(id) {
  favoritos = esFavorito(id) ? favoritos.filter((favoritoId) => favoritoId !== id) : [...favoritos, id];
  guardarEnStorage(CLAVE_FAVORITOS, favoritos);
  return esFavorito(id);
}
