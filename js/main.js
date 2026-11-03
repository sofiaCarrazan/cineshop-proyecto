import { peliculas } from './datos.js';
import { renderizarProductos } from './ui.js';
import { agregarAlCarrito, inicializarCarrito, manejarAccionesCarrito } from './carrito.js'; // <-- Importamos la función del carrito
import { inicializarFavoritos } from './favoritos.js';
import { inicializarCheckout } from './formulario.js';

const inputBusqueda = document.querySelector("#input-busqueda");
const botonesFiltro = document.querySelectorAll(".btn-filtro");
const contenedorProductos = document.querySelector("#contenedor-productos"); 
const btnModoOscuro = document.querySelector("#btn-modo-oscuro");
const btnCarritoHeader = document.querySelector("#btn-carrito");
const carritoContainer = document.querySelector("#carrito-container");
const btnCerrarCarrito = document.querySelector("#btn-cerrar-carrito");
if (btnCerrarCarrito && carritoContainer) {
  btnCerrarCarrito.addEventListener("click", () => {
    carritoContainer.classList.remove("abierto");
  });
}
if (btnCarritoHeader && carritoContainer) {
  btnCarritoHeader.addEventListener("click", () => {
    carritoContainer.classList.toggle("abierto");
  });
}

function inicializarApp() {
  console.log("¡Aplicación iniciada correctamente!");
  
  renderizarProductos(peliculas);
  activarFiltrosCategoria();
  activarBuscador();
  activarDelegacionEventos(); 
  inicializarCarrito(peliculas);
  inicializarCheckout(); 
  inicializarFavoritos(peliculas);
}

function activarFiltrosCategoria() {
  botonesFiltro.forEach(boton => {
    boton.addEventListener("click", (e) => {
      const categoria = e.target.dataset.categoria;
if (categoria === "todos") {
  renderizarProductos(peliculas);
} else if (categoria === "favoritos") {
  const favoritosGuardados = JSON.parse(localStorage.getItem("favoritosCineShop")) || [];
  renderizarProductos(favoritosGuardados);
} else {
  const peliculasFiltradas = peliculas.filter(p => p.categoria === categoria);
  renderizarProductos(peliculasFiltradas);
}
    });
  });
}

function activarBuscador() {
  let timer;
  inputBusqueda.addEventListener("input", (e) => {
    const textoBusqueda = e.target.value.toLowerCase().trim();
    clearTimeout(timer);
    timer = setTimeout(() => {
      const peliculasFiltradas = peliculas.filter(p => p.nombre.toLowerCase().includes(textoBusqueda));
      renderizarProductos(peliculasFiltradas);
    }, 300);
  });
}

function activarDelegacionEventos() {
  contenedorProductos.addEventListener("click", (e) => {
    const botonAgregar = e.target.closest(".btn-agregar");

    if (botonAgregar) {
      const idProducto = botonAgregar.dataset.id;
      agregarAlCarrito(peliculas, idProducto);
    }
  });
}
/** Funcion activar modo oscuro */
function activarModoOscuro() {
  console.log("Buscando botón de modo oscuro:", btnModoOscuro);

  const modoOscuroGuardado = localStorage.getItem("modoOscuroCineShop");
  if (modoOscuroGuardado === "activado") {
    document.body.classList.add("dark-mode");
    if (btnModoOscuro) btnModoOscuro.textContent = "☀️";
  }

  if (btnModoOscuro) {
    btnModoOscuro.addEventListener("click", () => {
      console.log("¡Hiciste clic en la luna!"); 
      
      document.body.classList.toggle("dark-mode");
      const estaOscuro = document.body.classList.contains("dark-mode");

      if (estaOscuro) {
        localStorage.setItem("modoOscuroCineShop", "activado");
        btnModoOscuro.textContent = "☀️";
      } else {
        localStorage.setItem("modoOscuroCineShop", "desactivado");
        btnModoOscuro.textContent = "🌙";
      }
    });
  } else {
    console.error("¡No se encontró el botón #btn-modo-oscuro en el DOM!");
  }
}

document.addEventListener("DOMContentLoaded", inicializarApp);
