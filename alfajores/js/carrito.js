import { buscarProducto } from "./datos.js";
import { cargarLista, formatearDinero, guardarEnStorage } from "./helpers.js";
import { mostrarToast } from "./ui.js";

const CLAVE_CARRITO = "alfajores-carrito";

const lista = document.querySelector("#listaCarrito");
const mensajeVacio = document.querySelector("#carritoVacio");
const totalEl = document.querySelector("#total");
const contadorEl = document.querySelector("#contadorCarrito");

const esItemValido = (item) =>
  Boolean(item) && Boolean(buscarProducto(item.id)) && Number.isInteger(item.cantidad) && item.cantidad > 0;

let carrito = cargarLista(CLAVE_CARRITO).filter(esItemValido);

function crearItemHTML({ id, cantidad }) {
  const { imagen, nombre, precio } = buscarProducto(id);
  return `
    <div class="item">
      <img class="item__imagen" src="${imagen}" alt="${nombre}">
      <div class="item__info">
        <p class="item__nombre">${nombre}</p>
        <p class="suave">${formatearDinero(precio)} c/u</p>
      </div>
      <div class="item__controles">
        <button class="btn btn--chico" data-accion="menos" data-id="${id}" aria-label="Restar uno">−</button>
        <span>${cantidad}</span>
        <button class="btn btn--chico" data-accion="mas" data-id="${id}" aria-label="Sumar uno">+</button>
        <button class="btn btn--chico btn--secundario" data-accion="eliminar" data-id="${id}" aria-label="Quitar del carrito">🗑️</button>
      </div>
    </div>`;
}

function renderizarCarrito() {
  lista.innerHTML = carrito.map(crearItemHTML).join("");
  mensajeVacio.classList.toggle("oculto", carrito.length > 0);

  const total = carrito.reduce((acumulado, { id, cantidad }) => acumulado + buscarProducto(id).precio * cantidad, 0);
  totalEl.textContent = formatearDinero(total);
  contadorEl.textContent = carrito.reduce((acumulado, { cantidad }) => acumulado + cantidad, 0);
}

function actualizarCarrito() {
  guardarEnStorage(CLAVE_CARRITO, carrito);
  renderizarCarrito();
}

export const carritoEstaVacio = () => carrito.length === 0;

export function agregarAlCarrito(id) {
  const itemExistente = carrito.find((item) => item.id === id);
  if (itemExistente) itemExistente.cantidad++;
  else carrito.push({ id, cantidad: 1 });
  actualizarCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);
  actualizarCarrito();
  mostrarToast(`Quitado del carrito: ${buscarProducto(id).nombre}`);
}

function cambiarCantidad(id, diferencia) {
  const item = carrito.find((itemCarrito) => itemCarrito.id === id);
  item.cantidad += diferencia;
  if (item.cantidad <= 0) eliminarDelCarrito(id);
  else actualizarCarrito();
}

export function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

export function iniciarCarrito() {
  lista.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-accion]");
    if (!boton) return;
    const id = Number(boton.dataset.id);
    const acciones = {
      mas: () => cambiarCantidad(id, 1),
      menos: () => cambiarCantidad(id, -1),
      eliminar: () => eliminarDelCarrito(id),
    };
    acciones[boton.dataset.accion]();
  });

  document.querySelector("#btnVaciar").addEventListener("click", () => {
    if (carritoEstaVacio()) return;
    vaciarCarrito();
    mostrarToast("Carrito vaciado");
  });

  renderizarCarrito();
}
