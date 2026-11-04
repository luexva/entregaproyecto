import { simularEspera } from "./helpers.js";
import { carritoEstaVacio, vaciarCarrito } from "./carrito.js";
import { mostrarSpinner, mostrarToast } from "./ui.js";

const REGEX_NOMBRE = /^[a-zA-ZÀ-ÿ\s]{3,60}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^\d{8,15}$/;
const LARGO_MIN_DIRECCION = 8;

const form = document.querySelector("#formCheckout");
const mensajeExito = document.querySelector("#mensajeExito");

const validadores = {
  nombre: (valor) => {
    if (valor === "") return "El nombre es obligatorio.";
    return REGEX_NOMBRE.test(valor) ? "" : "Ingresá solo letras (3 a 60 caracteres).";
  },
  email: (valor) => {
    if (valor === "") return "El correo es obligatorio.";
    return REGEX_EMAIL.test(valor) ? "" : "Ingresá un correo válido (ej: nombre@mail.com).";
  },
  telefono: (valor) => {
    if (valor === "") return "El teléfono es obligatorio.";
    return REGEX_TELEFONO.test(valor.replace(/[\s-]/g, "")) ? "" : "Ingresá solo números (8 a 15 dígitos).";
  },
  direccion: (valor) => {
    if (valor === "") return "La dirección es obligatoria.";
    return valor.length >= LARGO_MIN_DIRECCION ? "" : `Escribí al menos ${LARGO_MIN_DIRECCION} caracteres.`;
  },
};

function validarCampo(nombreCampo) {
  const input = form.elements[nombreCampo];
  const mensajeError = validadores[nombreCampo](input.value.trim());
  form.querySelector(`[data-error="${nombreCampo}"]`).textContent = mensajeError;
  input.classList.toggle("error", mensajeError !== "");
  input.classList.toggle("valido", mensajeError === "");
  return mensajeError === "";
}

const validarFormulario = () => Object.keys(validadores).map(validarCampo).every(Boolean);

function limpiarFormulario() {
  form.reset();
  form.querySelectorAll("input").forEach((input) => input.classList.remove("error", "valido"));
}

async function confirmarCompra() {
  mostrarSpinner(true);
  await simularEspera(1800);
  mostrarSpinner(false);

  vaciarCarrito();
  limpiarFormulario();
  mensajeExito.classList.remove("oculto");
  mostrarToast("Compra confirmada. ¡Gracias!", "exito");
}

export function iniciarFormulario() {
  form.addEventListener("input", (e) => {
    mensajeExito.classList.add("oculto");
    if (e.target.name in validadores) validarCampo(e.target.name);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (carritoEstaVacio()) return mostrarToast("Sumá al menos un alfajor antes de comprar.", "error");
    if (validarFormulario()) confirmarCompra();
  });
}
