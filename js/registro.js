// declaro las constantes
const formularioRegistro = document.querySelector("#formRegistrarse"),
    nombre = document.querySelector("#nombre"),
    usuario = document.querySelector("#usuario"),
    email = document.querySelector("#email"),
    contrasena = document.querySelector("#contrasena");

// validacion de usuarios
let usuariosregistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

// creo clase contructora de usuario
class Usuario {
    constructor(nombre, usuario, email, contrasena) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.email = email;
        this.contrasena = contrasena;
    }
}

// guardo funcion en localStorage
function guardarEnLS(arr) {
    return localStorage.setItem("usuarios", JSON.stringify(arr));
}

// creo nuevo usuario
formularioRegistro.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUsuario = new Usuario(nombre.value, usuario.value, email.value, contrasena.value);
    usuariosregistrados.push(newUsuario);
    guardarEnLS(usuariosregistrados);

    nombre.value = "";
    usuario.value = "";
    email.value = "";
    contrasena.value = "";

    document.querySelector('#usuarioRegistrado').innerHTML = "Te has registrado con exito!"
})