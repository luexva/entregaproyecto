const contenedorToasts = document.querySelector("#toasts");
const spinner = document.querySelector("#spinner");
const CLAVE_TEMA = "alfajores-tema";

export function mostrarToast(mensaje, tipo = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast--${tipo}`;
  toast.textContent = mensaje;
  contenedorToasts.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast--saliendo");
    toast.addEventListener("animationend", () => toast.remove());
  }, 2500);
}

export const mostrarSpinner = (visible) => spinner.classList.toggle("oculto", !visible);

export function iniciarTema() {
  const boton = document.querySelector("#btnTema");

  const aplicarTema = (tema) => {
    document.body.classList.toggle("oscuro", tema === "oscuro");
    boton.textContent = tema === "oscuro" ? " Claro" : " Oscuro";
  };

  aplicarTema(localStorage.getItem(CLAVE_TEMA));

  boton.addEventListener("click", () => {
    const temaNuevo = document.body.classList.contains("oscuro") ? "claro" : "oscuro";
    localStorage.setItem(CLAVE_TEMA, temaNuevo);
    aplicarTema(temaNuevo);
  });
}

export function iniciarNavegacion() {
  document.querySelector(".header").addEventListener("click", (e) => {
    const enlace = e.target.closest("a[href^='#']");
    if (!enlace) return;
    e.preventDefault();
    document.querySelector(enlace.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
}
