 let carrito = [];

const contenedorCarritoItems = document.querySelector("#contenedor-carrito-items"); 
const totalCarrito = document.querySelector("#total-carrito");
const contadorCarrito = document.querySelector("#contador-carrito");
 // Función para cargar el carrito guardado en localStorage al iniciar la app
export function inicializarCarrito(peliculas) {
  try {
    const carritoGuardado = localStorage.getItem("carritoCineShop");
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
    }
  } catch (error) {
    console.error("Error al leer el carrito de localStorage:", error);
    carrito = []; 
  }
  actualizarCarritoUI(peliculas);
  if (contenedorCarritoItems) {
    contenedorCarritoItems.addEventListener("click", (e) => {
      manejarAccionesCarrito(e, peliculas);
    });
  }
}
 //Función para agregar un producto al carrito
export function agregarAlCarrito(peliculas, idProducto) {
  const productoExistente = carrito.find(item => item.id === Number(idProducto));

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    const peliculaEncontrada = peliculas.find(pelicula => pelicula.id === Number(idProducto));
    if (peliculaEncontrada) {
      carrito.push({ ...peliculaEncontrada, cantidad: 1 });
    }
  }

  actualizarCarritoUI(peliculas);
}
// Función para manejar las acciones dentro del carrito (sumar, restar, eliminar)
export function manejarAccionesCarrito(e, peliculas) {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("btn-sumar")) {
    const item = carrito.find(p => p.id === id);
    if (item) item.cantidad++;
  } 
  else if (e.target.classList.contains("btn-restar")) {
    const item = carrito.find(p => p.id === id);
    if (item && item.cantidad > 1) {
      item.cantidad--;
    } else {
      carrito = carrito.filter(p => p.id !== id);
    }
  } 
  else if (e.target.classList.contains("btn-eliminar")) {
    carrito = carrito.filter(p => p.id !== id);
  }

  actualizarCarritoUI(peliculas);
}
 // Función central que actualiza la interfaz, los totales y guarda en localStorage
function actualizarCarritoUI(peliculas) {
  try {
    localStorage.setItem("carritoCineShop", JSON.stringify(carrito));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  if (contadorCarrito) {
    contadorCarrito.textContent = totalItems;
  }

  const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  if (totalCarrito) {
    totalCarrito.textContent = `$${precioTotal}`;
  }

  if (contenedorCarritoItems) {
    if (carrito.length === 0) {
      contenedorCarritoItems.innerHTML = `<p class="carrito-vacio">El carrito está vacío 🛒</p>`;
      return;
    }

    contenedorCarritoItems.innerHTML = carrito.map(item => `
      <div class="item-carrito">
        <img src="${item.imagen}" alt="${item.nombre}" width="50">
        <div class="info-item">
          <h4>${item.nombre}</h4>
          <p>$${item.precio} x ${item.cantidad}</p>
        </div>
        <div class="botones-cantidad">
          <button class="btn-restar" data-id="${item.id}">-</button>
          <span>${item.cantidad}</span>
          <button class="btn-sumar" data-id="${item.id}">+</button>
          <button class="btn-eliminar" data-id="${item.id}">🗑️</button>
        </div>
      </div>
    `).join("");
  }
}
