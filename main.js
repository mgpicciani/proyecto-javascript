document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    const confirmarEnvioBtn = document.getElementById('confirmar-envio');
    const confirmarPagoBtn = document.getElementById('confirmar-pago');
    const mensajeAgradecimiento = document.getElementById('mensaje-agradecimiento');
    const productosDiv = document.getElementById('productos');
    const envioDiv = document.getElementById('envio');
    const pagoDiv = document.getElementById('pago');

    // Cargar productos desde JSON en localStorage
    function cargarProductos() {
        const productos = [
            {
                nombre: 'Playstation 5',
                precio: 1500000,
                imagen: 'img/play 5.jpg'
            },
            {
                nombre: 'Playstation 4',
                precio: 900000,
                imagen: 'img/play 4.jpg'
            },
            {
                nombre: 'Nintendo Switch',
                precio: 1500000,
                imagen: 'img/nintendo.png'
            },
            {
                nombre: 'Xbox Series S',
                precio: 1000000,
                imagen: 'img/xbox series s.png'
            }
        ];

        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>Precio: $${producto.precio}</p>
                <button class="agregar-al-carrito">Agregar al carrito</button>
            `;
            productosDiv.appendChild(productoDiv);
        });

        document.querySelectorAll('.agregar-al-carrito').forEach(btn => {
            btn.addEventListener('click', agregarAlCarrito);
        });
    }

    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    function guardarCarrito(carritoItems) {
        localStorage.setItem('carrito', JSON.stringify(carritoItems));
    }

    function actualizarCarrito() {
        const carritoItems = obtenerCarrito();
        carrito.innerHTML = '';
        let total = 0;

        carritoItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio}`;
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', () => eliminarProducto(index));
            li.appendChild(eliminarBtn);
            carrito.appendChild(li);
            total += item.precio;
        });

        totalSpan.textContent = total;
    }

    function agregarAlCarrito(event) {
        const producto = event.target.closest('.producto');
        const nombre = producto.querySelector('h2').textContent;
        const precio = parseFloat(producto.querySelector('p').textContent.replace('Precio: $', ''));

        const carritoItems = obtenerCarrito();
        carritoItems.push({ nombre, precio });
        guardarCarrito(carritoItems);
        actualizarCarrito();
    }

    function eliminarProducto(index) {
        const carritoItems = obtenerCarrito();
        carritoItems.splice(index, 1);
        guardarCarrito(carritoItems);
        actualizarCarrito();
    }

    function vaciarCarrito() {
        localStorage.removeItem('carrito');
        actualizarCarrito();
    }

    function confirmarEnvio() {
        envioDiv.style.display = 'none';
        pagoDiv.style.display = 'block';
    }

    function confirmarPago() {
        localStorage.removeItem('carrito');
        actualizarCarrito();
        mensajeAgradecimiento.style.display = 'block';
        pagoDiv.style.display = 'none';
    }

    function finalizarCompra() {
        if (!document.getElementById('nombre').value || !document.getElementById('direccion').value || !document.getElementById('ciudad').value || !document.getElementById('codigo-postal').value) {
            alert('Por favor, complete todos los detalles de envío.');
            return;
        }

        confirmarEnvio();
    }

    cargarProductos();
    actualizarCarrito();

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    finalizarCompraBtn.addEventListener('click', finalizarCompra);
    confirmarEnvioBtn.addEventListener('click', confirmarEnvio);
    confirmarPagoBtn.addEventListener('click', confirmarPago);
});
