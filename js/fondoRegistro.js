//CONSTANTE MAIN
const mainRegistro = document.querySelector("#imgFondoRegistro");

//CONSTANTE FONDOS
const fondos = ["anden.jpg", "barrendero.jpg", "logoer.png", "escoba.jpg", "fotocepillos.jpg", "pincel.jpg"];

//CAMBIAMOS FONDOS ALEATORIAMENTE
function cambiarFondoRegistro(fondos) {
    let aleatorio = Math.floor(Math.random() * fondos.length)
    mainRegistro.setAttribute("src", `../img/${fondos[aleatorio]}`);
}

window.onload = cambiarFondoRegistro(fondos);