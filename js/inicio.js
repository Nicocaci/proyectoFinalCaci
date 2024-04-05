// declaro las constantes
const formInico = document.querySelector("#formInicio"),
    usuarioDos = document.querySelector("#usuarioDos"),
    contrasenaDos = document.querySelector("#contrasenaDos"),
    p = document.querySelector("#usuarioNoEncontrado");

// recupero informacion del localStorage
function recuperarLS() {
    return JSON.parse(localStorage.getItem("usuarios"));
}

//CONSTANTE LS
const usuarioLS = recuperarLS();
// funcion para inicio de sesion 
function inicioSesion(user) {
    let usuarioEncontrado = user.find((usuario) => {
        return usuario.usuario == usuarioDos.value && usuario.contrasena == contrasenaDos.value;
    })

    usuarioEncontrado ? location.href = "../pages/carrito.html" : document.querySelector('#usuarioNoEncontrado').innerHTML = "Usuario no encontrado";

}

//INICIAR SESION
formInico.addEventListener("submit", (e) => {
    e.preventDefault();
    inicioSesion(usuarioLS);
});