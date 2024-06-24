// script.js

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, descripcion, cantidad, imagePath, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ nombre, descripcion, cantidad, imagePath, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarAlerta(nombre, 'Producto agregado al carrito');
}

function mostrarConfirmacionEliminar(index) {
    productoAEliminar = index;

    const eliminar = document.createElement('div');
    eliminar.classList.add('alerta');

    eliminar.innerHTML = `
        <h3>Confirmar Eliminación</h3>
        <p>¿Estás seguro de que deseas eliminar este producto del carrito?</p>
        <button onclick="confirmarEliminar()">Sí</button> <button onclick="cerrarCartelConfirmarEliminnar()">No</button>
    `;

    document.body.appendChild(eliminar);
}

function cerrarCartelConfirmarEliminnar() {
    const alerta = document.querySelector('.alerta');
    if (alerta) {
        alerta.remove();
    }
}

function confirmarEliminar() {
    if (productoAEliminar !== null) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.splice(productoAEliminar, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        productoAEliminar = null;
        cerrarAlerta();
        mostrarCarrito();
    }
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';


    if (carrito.length == 0) {
        carritoItems.innerHTML = `
            <div class="empty-cart-message">
                <h3>Tu carrito está vacío 😢</h3>
                <p>¡No te quedes sin probar nuestras delicias! Agrega tus pasteles favoritos y disfruta del sabor casero que tanto amas. 🍰</p>
                <a href="productos.html" class="btn btn-black">Ver Productos</a>
            </div>
        `;
    } else {

    

    let productosEnFila = 3; // Número máximo de productos por fila
    let filaActual;

    carrito.forEach((item, index) => {
        // Verificar si se necesita crear una nueva fila
        if (!filaActual || filaActual.children.length >= productosEnFila) {
            // Crear una nueva fila si no hay fila actual o la fila actual está llena
            let nuevaFila = document.createElement('div');
            nuevaFila.classList.add('row', 'mb-4');
            carritoItems.appendChild(nuevaFila);
            filaActual = nuevaFila; // Asegurar que filaActual apunte a la nueva fila
        }

        // Crear el elemento del producto
        let producto = document.createElement('div');
        producto.classList.add('col-md-4', 'mb-2');

        // Construir el contenido del producto
        producto.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <img src="${item.imagePath}" class="card-img-top" alt="${item.nombre}">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">${item.descripcion}</p>
                    <p class="card-text">Cantidad: ${item.cantidad}</p>
                    <p class="card-text">Precio Total: $${item.cantidad * item.precio} </p>
                    <button class="btn btn-black" onclick="mostrarConfirmacionEliminar(${index})">Eliminar</button>
                </div>
            </div>
        `;

        // Agregar el producto a la fila actual
        filaActual.appendChild(producto);
    });
    }
}

// Función para generar solo el resumen del carrito
function generarResumenCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let resumenPedido = document.getElementById('resumen-pedido');
    resumenPedido.innerHTML = '';
    let totalAPagar = 0;

    // Resumen de compra
    let resumen = '<h3>Resumen de compra</h3><ul class="list-unstyled">';
    carrito.forEach((item) => {
        resumen += `<li>${item.nombre} - ${item.cantidad} unidades: $${item.precio * item.cantidad}</li>`;
        totalAPagar+= (item.precio * item.cantidad)
    });
    resumen += `<hr><li>Total: $ ${totalAPagar} </li>`
    resumen += '</ul>';
    resumenPedido.innerHTML = resumen;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

// Función para proceder al pago
function procederPago() {
    window.location.href = 'pedido.html';
}

// Función para realizar el pago
function realizarPago(event) {
    event.preventDefault();
    localStorage.removeItem('carrito');
    window.location.href = 'index.html';
}

// Mostrar el carrito al cargar la página
if (document.getElementById('carrito-items')) {
    mostrarCarrito();
}


// Función para crear un nuevo producto y gestionar filas dinámicamente
function crearProducto(imagePath, titulo, descripcion, productosEnFila, precio) {
    // Encontrar el contenedor de productos
    var contenedorProductos = document.getElementById('productos');

    // Verificar si se necesita crear una nueva fila
    var filas = contenedorProductos.querySelectorAll('.row');
    var ultimaFila = filas[filas.length - 1];
    
    if (!ultimaFila || ultimaFila.children.length >= productosEnFila) {
        // Crear una nueva fila si no hay fila actual o la fila actual está llena
        var nuevaFila = document.createElement('div');
        nuevaFila.classList.add('row', 'mb-4');
        contenedorProductos.appendChild(nuevaFila);
    }

    // Encontrar la última fila agregada o la nueva fila creada
    filas = contenedorProductos.querySelectorAll('.row');
    ultimaFila = filas[filas.length - 1];

    // Crear el elemento del producto
    var producto = document.createElement('div');
    producto.classList.add('col-md-4');

    // Construir el contenido del producto
    producto.innerHTML = `
           <div class="card">
            <img src="${imagePath}" class="card-img-top" alt="${titulo}" onclick="abrirModalImagen('${imagePath}', '${titulo}')">
            <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${descripcion}</p>
                <p class="card-text">$ ${precio}</p>
                <div class="form-group">
                    <label for="cantidad-${titulo}">Cantidad:</label>
                    <input type="number" id="cantidad-${titulo}" class="form-control" value="1" min="1">
                </div>
                <button class="btn btn-black" onclick="agregarAlCarrito('${titulo}', '${descripcion}', document.getElementById('cantidad-${titulo}').value, '${imagePath}', '${precio}')">Agregar al Carrito</button>
            </div>
        </div>
    `;

    // Agregar el producto a la última fila
    ultimaFila.appendChild(producto);   
}

function abrirModalImagen(imagePath, nombre) {

    if(!document.getElementById("modal-expandir-imagen")){
        agregarModalMaximizarFotos();
     }
    document.getElementById('modalImage').src = imagePath;
    document.getElementById('imageModalLabel').innerText = nombre;
    $('#imageModal').modal('show');
}

/*
Esta funcion retorna un HTML con el resumen del carrito actual
*/
function generarResumenCarritoHTML() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let resumenPedido = document.getElementById('resumen-pedido');
    resumenPedido.innerHTML = '';
    let totalAPagar = 0;

    // Resumen de compra
    let resumen = '<h3>Resumen de compra</h3><ul class="list-unstyled">';
    carrito.forEach((item) => {
        resumen += `<li>${item.nombre} - ${item.cantidad} unidades: $${item.precio * item.cantidad}</li>`;
        totalAPagar+= (item.precio * item.cantidad)
    });
    resumen += `<hr><li>Total: $ ${totalAPagar} </li>`
    resumen += '</ul>';
    return resumen;
}

function generarResumenCarritoParaWhatsApp(nombreCliente, aclaraciones) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let totalAPagar = 0;

    // Resumen de compra
    let resumen = `Hola! mi nombre es ${nombreCliente},\nQuiero Encargar lo siguiente:\n`;
    carrito.forEach((item) => {
        resumen += `${item.nombre} - ${item.cantidad} unidades: $${item.precio * item.cantidad}\n`;
        totalAPagar += (item.precio * item.cantidad);
    });
    resumen += `\nTotal: $${totalAPagar}`;

    resumen += `\n\n Aclaraciones: \n${aclaraciones}`;

    // Codificar el mensaje en formato URL
    let mensajeCodificado = encodeURIComponent(resumen);
    
    // Generar el enlace de WhatsApp
    let numeroTelefono = '5493329569447'; // Reemplaza esto con el número de teléfono deseado
    let enlaceWhatsApp = `https://api.whatsapp.com/send/?phone=${numeroTelefono}&text=${mensajeCodificado}&type=phone_number&app_absent=0`;

    return enlaceWhatsApp;
}


// EventListener para el evento submit del formulario
document.getElementById('form-pedido').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    // Obtener los valores del formulario
    let nombre = document.getElementById('name').value;
    let mensaje = document.getElementById('message').value;

    pedido = generarResumenCarritoHTML();

    window.location.href = generarResumenCarritoParaWhatsApp(nombre, mensaje);

    mostrarAlerta('¡Pedido Enviado!', 'Gracias por tu pedido. Nos pondremos en contacto contigo pronto.');
    this.reset(); 
});

function mostrarAlerta(titulo, mensaje) {
    const alerta = document.createElement('div');
    alerta.classList.add('alerta');

    alerta.innerHTML = `
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
        <button onclick="cerrarAlerta()">Aceptar</button>
    `;

    document.body.appendChild(alerta);
}

function cerrarAlerta() {
    const alerta = document.querySelector('.alerta');
    if (alerta) {
        alerta.remove();
    }
}

function agregarModalMaximizarFotos() {
    // Crear el elemento del modal
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal', 'fade');
    modalDiv.id = 'imageModal';
    modalDiv.tabIndex = '-1';
    modalDiv.role = 'dialog';
    modalDiv.setAttribute('aria-labelledby', 'imageModalLabel');
    modalDiv.setAttribute('aria-hidden', 'true');

    // Contenido del modal
    modalDiv.innerHTML = `
        <div class="modal-dialog modal-dialog-centered" role="document" id="modal-expandir-imagen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">Imagen ampliada</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img id="modalImage" src="" class="img-fluid" alt="Imagen ampliada">
                </div>
            </div>
        </div>
    `;

    // Agregar el modal al final del cuerpo del documento
    document.body.appendChild(modalDiv);
}







