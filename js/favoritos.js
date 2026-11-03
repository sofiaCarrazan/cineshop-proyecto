let favoritos = [];
 //Inicializa los favoritos cargándolos del localStorage
export function inicializarFavoritos(peliculas) {
  try {
    const favoritosGuardados = localStorage.getItem("favoritosCineShop");
    if (favoritosGuardados) {
      favoritos = JSON.parse(favoritosGuardados);
    }
  } catch (error) {
    console.error("Error al leer favoritos de localStorage:", error);
    favoritos = [];
  }

  // Delegación de eventos para los botones de favoritos en las tarjetas
  const contenedorProductos = document.querySelector("#contenedor-productos");
  if (contenedorProductos) {
    contenedorProductos.addEventListener("click", (e) => {
      const botonFavorito = e.target.closest(".btn-favorito");
      if (botonFavorito) {
        const idProducto = Number(botonFavorito.dataset.id);
        toggleFavorito(idProducto, peliculas);
      }
    });
  }
}
function toggleFavorito(idProducto, peliculas) {
  const index = favoritos.findIndex(item => item.id === idProducto);
  
  const botonFav = document.querySelector(`.btn-favorito[data-id="${idProducto}"]`);

  if (index !== -1) {
    favoritos.splice(index, 1);
    if (botonFav) botonFav.classList.remove('activo'); 
  } else {
    const peliculaEncontrada = peliculas.find(p => p.id === idProducto);
    if (peliculaEncontrada) {
      favoritos.push(peliculaEncontrada);
      if (botonFav) botonFav.classList.add('activo'); 
    }
  }

  try {
    localStorage.setItem("favoritosCineShop", JSON.stringify(favoritos));
  } catch (error) {
    console.error("Error al guardar favoritos:", error);
  }

  console.log("Favoritos actualizados:", favoritos);
}