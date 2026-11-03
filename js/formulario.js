export function inicializarCheckout(peliculas, actualizarCarritoUI) {
  const formCheckout = document.querySelector("#form-checkout");
  const inputNombre = document.querySelector("#nombre");
  const inputEmail = document.querySelector("#email");
  const inputTelefono = document.querySelector("#telefono");
  const inputDireccion = document.querySelector("#direccion");
  const mensajeExito = document.querySelector("#mensaje-exito");

  if (formCheckout) {
    formCheckout.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = inputNombre.value.trim();
      const email = inputEmail.value.trim();
      const telefono = inputTelefono.value.trim();
      const direccion = inputDireccion.value.trim();

      if (!nombre || !email || !telefono || !direccion) {
        alert("⚠️ Por favor, completa todos los campos.");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        alert("⚠️ Por favor, ingresa un correo electrónico válido.");
        return;
      }

      if (carrito.length === 0) {
        alert("⚠️ Tu carrito está vacío. Agrega películas antes de comprar.");
        return;
      }

      mensajeExito.textContent = `¡Gracias por tu compra, ${nombre}! Te enviamos los detalles a ${email}. 🎬`;

      carrito.length = 0; 
      
      if (typeof actualizarCarritoUI === 'function') {
        actualizarCarritoUI(peliculas);
      }

      formCheckout.reset();

      setTimeout(() => {
        mensajeExito.textContent = "";
      }, 5000);
    });
  }
}