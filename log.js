var contenedor;
var puntaje = 0;
var filas = 5;
var columnas = 5;

window.onload = function() {
    empezarJuego();
}

function empezarJuego() {
    contenedor = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]

    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let casilla = document.createElement("div");
            casilla.id = f.toString() + "-" + c.toString();
            let num = contenedor[f][c];
            actualizarCasilla(casilla, num);
            document.getElementById("contenedor").append(casilla);
        }
    }
    randomtwo();
    randomFour();
}

function actualizarCasilla(casilla, num) {
    casilla.innerText = "";
    casilla.classList.value = "";
    casilla.classList.add("casilla");
    if (num > 0) {
        casilla.innerText = num.toString();
        if (num <= 4096) {
            casilla.classList.add("x"+num.toString());
        } else {
            casilla.classList.add("x8192");
        }                
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "KeyA") {
        moverIzquierda();
        if (puntaje % 3 == 0){
            randomtwo();
            randomtwo();
            randomFour();
        }else{
            randomtwo();
        }
    }
    else if (e.code == "KeyD") {
        moverDerecha();
        if (puntaje % 3 == 0){
            randomtwo();
            randomtwo();
            randomFour();
        }else{
            randomtwo();
        }
    }
    else if (e.code == "KeyW") {
        moverArriba();
        if (puntaje % 3 == 0){
            randomtwo();
            randomtwo();
            randomFour();
        }else{
            randomtwo();
        }
    }
    else if (e.code == "KeyS") {
        moverAbajo();
        if (puntaje % 3 == 0){
            randomtwo();
            randomtwo();
            randomFour();
        }else{
            randomtwo();
        }

    }
    document.getElementById("puntaje").innerText = puntaje;
})

function ceroFilter(fila){
    return fila.filter(num => num != 0);
}

function mover(fila) {
    fila = ceroFilter(fila);
    for (let i = 0; i < fila.length-1; i++){
        if (fila[i] == fila[i+1]) {
            fila[i] *= 2;
            fila[i+1] = 0;
            puntaje += fila[i];
        }
    }
    fila = ceroFilter(fila);
    while (fila.length < columnas) {
        fila.push(0);
    }
    return fila;
}

function moverIzquierda() {
    for (let f = 0; f < filas; f++) {
        let fila = contenedor[f];
        fila = mover(fila);
        contenedor[f] = fila;
        for (let c = 0; c < columnas; c++){
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            let num = contenedor[f][c];
            actualizarCasilla(casilla, num);
        }
    }
}
function moverDerecha(){
    for (let f = 0; f < filas; f++) {
        let fila = contenedor[f];
        fila.reverse();
        fila = mover(fila);
        fila.reverse();
        contenedor[f] = fila;
        for (let c = 0; c < columnas; c++){
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            let num = contenedor[f][c];
            actualizarCasilla(casilla, num);
        }
    }
}
function moverArriba(){
    for (let c = 0;c < columnas;c++){
        let fila = [contenedor[0][c], contenedor[1][c], contenedor[2][c], contenedor[3][c], contenedor[4][c]];
        fila = mover(fila);
        for (let f = 0; f < filas; f++){
            contenedor[f][c] = fila[f]
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            let num = contenedor[f][c];
            actualizarCasilla(casilla, num);
        }
    }
}
function moverAbajo(){
    for (let c = 0;c < columnas;c++){
        let fila = [contenedor[0][c], contenedor[1][c], contenedor[2][c], contenedor[3][c], contenedor[4][c]];
        fila.reverse();
        fila = mover(fila);
        fila.reverse();
        for (let f = 0; f < filas; f++){
            contenedor[f][c] = fila[f]
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            let num = contenedor[f][c];
            actualizarCasilla(casilla, num);
        }
    }
}
function randomtwo() {
    if (!vacio()) {
        return;
    }
    let found = false;
    while (!found) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        if (contenedor[f][c] == 0) {
            contenedor[f][c] = 2;
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            casilla.innerText = "2";
            casilla.classList.add("x2");
            found = true;
        }
    }
}
function randomFour() {
    if (!vacio()) {
        return;
    }
    let found = false;
    while (!found) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        if (contenedor[f][c] == 0) {
            contenedor[f][c] = 4;
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            casilla.innerText = "4";
            casilla.classList.add("x4");
            found = true;
        }
    }
}

function vacio() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (contenedor[f][c] == 0) {
                return true;
            }
        }
    }
    return false;
}