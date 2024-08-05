document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');
    const vaciarCarritoButton = document.getElementById('vaciar-carrito');
    const mensajeAgradecimiento = document.getElementById('mensaje-agradecimiento');
    let total = 0;
    
    function actualizarTotal(cantidad, precio) {
        total += cantidad * precio;
        totalElement.textContent = total;
    }

    // Función para agregar producto al carrito
    function agregarAlCarrito(event) {
        const productoDiv = event.target.closest('.producto');
        const nombre = productoDiv.querySelector('h2').textContent;
        const precioTexto = productoDiv.querySelector('p').textContent;
        const precio = parseInt(precioTexto.replace('Precio: $', '').replace(/,/g, ''), 10);

        // Verifica si el producto ya está en el carrito
        const productoEnCarrito = Array.from(carrito.children).find(li => li.dataset.nombre === nombre);

        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, actualiza la cantidad y el precio
            let cantidad = parseInt(productoEnCarrito.dataset.cantidad, 10) + 1;
            productoEnCarrito.dataset.cantidad = cantidad;
            productoEnCarrito.querySelector('.cantidad').textContent = `Cantidad: ${cantidad}`;
            productoEnCarrito.querySelector('.precio').textContent = `Total: $${precio * cantidad}`;
            actualizarTotal(precio, 1); // Solo sumar el precio de una unidad adicional
        } else {
            // Si el producto no está en el carrito, crea un nuevo elemento
            const li = document.createElement('li');
            li.dataset.nombre = nombre;
            li.dataset.cantidad = 1;
            li.innerHTML = `
                ${nombre} - <span class="precio">Total: $${precio}</span> - <span class="cantidad">Cantidad: 1</span>
            `;
            
            // Añadir al carrito y actualizar total
            carrito.appendChild(li);
            actualizarTotal(precio, 1); // Sumar el precio del nuevo producto
        }
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito.innerHTML = '';
        total = 0;
        totalElement.textContent = total;
    }

    // Asignar evento a los botones de agregar al carrito
    const botonesAgregar = document.querySelectorAll('.agregar-al-carrito');
    botonesAgregar.forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });

    // Asignar evento al botón de vaciar carrito
    vaciarCarritoButton.addEventListener('click', vaciarCarrito);
});