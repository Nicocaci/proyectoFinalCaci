//CONSTANTE MAIN
const mainInicio = document.querySelector("#imgFondoInicio");

//CONSTANTE FONDOS
const fondos = ["anden.jpg", "barrendero.jpg", "FondoInicioTres.jpg", "escoba.jpg", "fotocepillos.jpg", "pincel.jpg"];

//CAMBIAMOS FONDOS ALEATORIAMENTE
function cambiarFondo(fondos) {
    let aleatorio = Math.floor(Math.random() * fondos.length)
    mainInicio.setAttribute("src", `../img/${fondos[aleatorio]}`);
}

window.onload = cambiarFondo(fondos);