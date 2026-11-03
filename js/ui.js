const contenedorProductos = document.querySelector("#contenedor-productos");
export function renderizarProductos(arrayPeliculas) {
  if (arrayPeliculas.length === 0) {
    contenedorProductos.innerHTML = `
      <div class="sin-resultados">
        <p>No se encontraron películas que coincidan con tu búsqueda.</p>
      </div>
    `;
    return;
  }

  contenedorProductos.innerHTML = arrayPeliculas.map(pelicula => {
    return `
      <div class="card-producto">
        <img src="${pelicula.imagen}" alt="${pelicula.nombre}">
        <div class="info-card">
          <span class="categoria">${pelicula.categoria}</span>
          <h3>${pelicula.nombre}</h3>
          <p class="precio">$${pelicula.precio}</p>
          
          <!-- Usamos atributos data-* para identificar fácilmente qué producto se quiere agregar o marcar como favorito -->
          <button class="btn-agregar" data-id="${pelicula.id}">Agregar al carrito</button>
          <button class="btn-favorito" data-id="${pelicula.id}">❤️</button>
        </div>
      </div>
    `;
  }).join("");
}