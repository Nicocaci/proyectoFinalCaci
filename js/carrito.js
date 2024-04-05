//------------------------------------------------------LISTA DE PRODUCTOS---------------------------------------------------------//

let productos = [];

fetch('../db/db.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos();
    });

//------------------------------------------------------BUSQUEDA Y FILTRADO DE PRODUCTOS----------------------------------------------//

const contenedorProductos = document.querySelector("#contenedorProductos");
const formularioCarrito = document.querySelector("#formularioCarritoCompras");

formularioCarrito.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputBusqueda = document.querySelector(".buscar");
    const terminoBusqueda = inputBusqueda.value.trim().toLowerCase();

    const productosFiltrados = productos.filter(producto =>
        producto.tipo.toLowerCase().includes(terminoBusqueda)
    );

    mostrarProductosFiltrados(productosFiltrados);
});

function mostrarProductosFiltrados(productosFiltrados) {
    contenedorProductos.innerHTML = "";

    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = '<p></p><p class= "hDosCarrito">Producto no encontrado</p><p></p>';
    } else {
        productosFiltrados.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("productoCarrito");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.tipo}">
                <div>
                    <h5 class="my-3 text-center">${producto.tipo}</h5>
                    <div class="d-flex justify-content-center">
                        <p class="mx-2 mt-3">$${producto.precio}</p>
                        <button type="button" id="${producto.id}" class="botonCarritoDos mx-2"><i class="bi bi-cart-plus"></i>
                            Añadir al Carrito</button>
                    </div>
                </div>   
            `;
            contenedorProductos.append(div);
        });

        botonesAgregarProducto();
    }
}


//------------------------------------------------------PRODUCTOS EN PAG PRINCIPAL---------------------------------------------------------//

function cargarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productoCarrito");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.tipo}">
            <div>
                <h5 class="my-3 text-center">${producto.tipo}</h5>
                <div class="d-flex justify-content-center">
                    <p class="mx-2 mt-3">$${producto.precio}</p>
                    <button type="button" id="${producto.id}" class="botonCarritoDos mx-2"><i class="bi bi-cart-plus"></i>
                        Añadir al Carrito</button>
                </div>
            </div>   
        `;
        contenedorProductos.append(div);
    });

    botonesAgregarProducto();
}

//------------------------------------------------------AGREGAR PRODUCTOS AL CARRITO LS---------------------------------------------------------//

//CARRITO
let productosEnCarrito = [];

//FUNCION PARA AGREGAR EVENTO PARA AGREGAR PRODUCTOS AL CARRITO
function botonesAgregarProducto() {
    const botonesAgregar = document.querySelectorAll(".botonCarritoDos");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

// AGREGAR PRODUCTOS AL CARRITO LS
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    //ACTUALIZAR LS
    localStorage.setItem("productosCarrito", JSON.stringify(productosEnCarrito));

    //MOSTRAR CARRITO ACTUALIZADO
    mostrarCarrito();

    // Mostrar toast solo si no hay productos en el carrito
    if (productosEnCarrito.length > 0) {
        Toastify({
            text: "Producto Agregado Al Carrito",
            duration: 1500,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient( rgb(97, 41, 97), rgb(173, 98, 173))",
                fontSize: "1.5rem",
                borderRadius: "2rem"
            },
            onClick: function () { }
        }).showToast();
    }
}


// CARGAR PRODUCTOS DEL CARRITO DESDE EL LOCAL STORAGE AL CARGAR LA PAGINA
function productosDesdeLS() {
    if (localStorage.getItem("productosCarrito")) {
        productosEnCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
        mostrarCarrito();
    }
}

//------------------------------------------------------AGREGAR PRODUCTOS AL CARRITO DINAMICO---------------------------------------------------------//

const contenedorCarrito = document.querySelector("#contenedorCarrito");
const vaciarCarritoBoton = document.querySelector("#vaciarCarrito");
const comprarAhoraBoton = document.querySelector("#comprarCarrito");
const carritoVacioMensaje = document.querySelector("#carritoVacio");
const totalCarrito = document.querySelector("#totalCarrito");


// MOSTRAR CARRITO Y SU TOTAL
function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";
    if (productosEnCarrito.length === 0) {
        carritoVacioMensaje.style.display = "block";
        totalCarrito.textContent = "Total: $0";
    } else {
        carritoVacioMensaje.style.display = "none";
        contenedorCarrito.innerHTML = '<p class= "hDosCarrito">Productos:</p>';
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("divCarritoDos");
            div.innerHTML = `
                <img class="imagenCarrito" src="${producto.imagen}" alt="${producto.tipo}">
                <p>${producto.tipo} x${producto.cantidad} - $${producto.precio * producto.cantidad}</p>
                <button type="button" class="botonCarritoDos pb-1 botonEliminarProducto" data-id="${producto.id}"><i class="bi bi-trash"></i></button>
            `;
            contenedorCarrito.append(div);
        });

        const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        totalCarrito.textContent = `Total: $${total}`;

        EliminarProductoIndividual();
    }
}

//FUNCION PARA AGREGAR EVENTO PARA ELIMINAR PRODUCTOS INDIVIDUALMENTE DEL CARRITO
function EliminarProductoIndividual() {
    const botonesEliminar = document.querySelectorAll(".botonEliminarProducto");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProducto);
    });
}

//FUNCION PARA ELIMINAR PRODUCTO DEL CARRITO
function eliminarProducto(e) {
    Toastify({
        text: "Producto Eliminado del Carrito",
        duration: 1500,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient( rgb(97, 41, 97), rgb(173, 98, 173))",
            fontSize: "1.5rem",
            borderRadius: "2rem"
        },
        onClick: function () { }
    }).showToast();
    const idProducto = e.currentTarget.dataset.id;
    const productoIndex = productosEnCarrito.findIndex(producto => producto.id === idProducto);

    if (productoIndex !== -1) {
        if (productosEnCarrito[productoIndex].cantidad > 1) {
            productosEnCarrito[productoIndex].cantidad--;
        } else {
            productosEnCarrito.splice(productoIndex, 1);
        }

        //ACTUALIZAR EL LS
        localStorage.setItem("productosCarrito", JSON.stringify(productosEnCarrito));

        //MOSTRAR CARRITO ACTUALIZADO
        mostrarCarrito();
    }


    //ACTUALIZAR EL LS
    localStorage.setItem("productosCarrito", JSON.stringify(productosEnCarrito));

    //MOSTRAR CARRITO ACTUALIZADO
    mostrarCarrito();
}

// CARGAR PRODUCTOS DEL CARRITO DESDE EL LOCAL STORAGE AL CARGAR LA PAGINA
productosDesdeLS();

// VACIAR CARRITO
function vaciarCarrito() {

    if (productosEnCarrito.length > 0) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success mx-1",
                cancelButton: "btn btn-danger mx-1"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Estás Seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Eliminado!",
                    text: "Tu producto ha sido eliminado con éxito!",
                    icon: "success"
                });

                productosEnCarrito = [];
                localStorage.removeItem("productosCarrito");
                mostrarCarrito();

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Tu producto no se ha eliminado!",
                    icon: "error"
                });
            }
        });
    } else {
        contenedorCarrito.innerHTML = ""
        carritoVacioMensaje.style.display = "block";
    }

}

// EVENTO PARA VACIAR CARRITO
vaciarCarritoBoton.addEventListener("click", vaciarCarrito);

// REALIZAR COMPRA
function comprarAhora() {

    if (productosEnCarrito.length == 0) {
        carritoVacioMensaje.style.display = "none";
        contenedorCarrito.innerHTML = '<p class= "carritoVacio my-0">Agrega Productos al Carrito!</p>';
    } else {
        Swal.fire({
            title: "Compra realizada con éxito!",
            text: "Muchas gracias por la visita!",
            icon: "success"
        });
        productosEnCarrito = [];
        localStorage.removeItem("productosCarrito");
        mostrarCarrito();
    }
}

// EVENTO PARA REALIZAR COMPRA
comprarAhoraBoton.addEventListener("click", comprarAhora);