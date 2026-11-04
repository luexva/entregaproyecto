import { buscarProducto } from "./js/datos.js";
import { simularEspera } from "./js/helpers.js";
import { iniciarProductos, renderizarProductos } from "./js/productos.js";
import { agregarAlCarrito, iniciarCarrito } from "./js/carrito.js";
import { alternarFavorito } from "./js/favoritos.js";
import { iniciarFormulario } from "./js/formulario.js";
import { iniciarNavegacion, iniciarTema, mostrarSpinner, mostrarToast } from "./js/ui.js";

function manejarAgregar(id) {
  agregarAlCarrito(id);
  mostrarToast(`Agregado al carrito: ${buscarProducto(id).nombre}`, "exito");
}

function manejarFavorito(id) {
  const esFavoritoAhora = alternarFavorito(id);
  const { nombre } = buscarProducto(id);
  mostrarToast(esFavoritoAhora ? `Sumado a favoritos: ${nombre}` : `Quitado de favoritos: ${nombre}`);
  renderizarProductos();
}

async function iniciar() {
  iniciarTema();
  iniciarNavegacion();
  iniciarCarrito();
  iniciarFormulario();
  iniciarProductos({ alAgregar: manejarAgregar, alAlternarFavorito: manejarFavorito });

  mostrarSpinner(true);
  await simularEspera(800);
  renderizarProductos();
  mostrarSpinner(false);
}

iniciar();
