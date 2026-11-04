import { categorias, productos } from "./datos.js";
import { debounce, formatearDinero } from "./helpers.js";
import { esFavorito } from "./favoritos.js";

const estado = { categoria: "todos", busqueda: "" };

const grilla = document.querySelector("#grillaProductos");
const contenedorFiltros = document.querySelector("#filtros");
const inputBusqueda = document.querySelector("#inputBusqueda");
const contador = document.querySelector("#contadorProductos");
const sinResultados = document.querySelector("#sinResultados");

function crearCardHTML(producto) {
  const favorito = esFavorito(producto.id);
  return `
    <article class="card">
      <button class="card__favorito ${favorito ? "activo" : ""}" data-accion="favorito" data-id="${producto.id}"
        aria-label="Marcar como favorito" aria-pressed="${favorito}">${favorito ? "♥" : "♡"}</button>
      <div class="card__imagen">
        ${producto.masVendido ? '<span class="badge">Más vendido</span>' : ""}
        ${producto.oferta ? '<span class="badge badge--oferta">Oferta</span>' : ""}
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
      </div>
      <div class="card__cuerpo">
        <h3>${producto.nombre}</h3>
        <p class="suave">${producto.descripcion}</p>
        <div class="card__pie">
          <strong>${formatearDinero(producto.precio)}</strong>
          <button class="btn" data-accion="agregar" data-id="${producto.id}">Agregar</button>
        </div>
      </div>
    </article>`;
}

function crearFiltroHTML({ id, nombre }) {
  return `<button class="filtro ${id === estado.categoria ? "activo" : ""}" data-categoria="${id}">${nombre}</button>`;
}

function obtenerProductosFiltrados() {
  const texto = estado.busqueda.toLowerCase();
  return productos.filter(({ categoria, nombre, descripcion }) => {
    const coincideCategoria = estado.categoria === "todos" || categoria === estado.categoria;
    const coincideTexto = `${nombre} ${descripcion}`.toLowerCase().includes(texto);
    return coincideCategoria && coincideTexto;
  });
}

function renderizarFiltros() {
  contenedorFiltros.innerHTML = categorias.map(crearFiltroHTML).join("");
}

export function renderizarProductos() {
  const filtrados = obtenerProductosFiltrados();
  grilla.innerHTML = filtrados.map(crearCardHTML).join("");
  contador.textContent = `Mostrando ${filtrados.length} alfajor${filtrados.length === 1 ? "" : "es"}`;
  sinResultados.classList.toggle("oculto", filtrados.length > 0);
}

export function iniciarProductos({ alAgregar, alAlternarFavorito }) {
  renderizarFiltros();

  contenedorFiltros.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-categoria]");
    if (!boton) return;
    estado.categoria = boton.dataset.categoria;
    renderizarFiltros();
    renderizarProductos();
  });

  inputBusqueda.addEventListener("input", debounce((e) => {
    estado.busqueda = e.target.value.trim();
    renderizarProductos();
  }, 300));

  grilla.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-accion]");
    if (!boton) return;
    const id = Number(boton.dataset.id);
    if (boton.dataset.accion === "agregar") alAgregar(id);
    else if (boton.dataset.accion === "favorito") alAlternarFavorito(id);
  });
}
