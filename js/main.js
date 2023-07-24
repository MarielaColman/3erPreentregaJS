const nombreGasto = document.getElementById("nombreGasto");
const cantidadGasto = document.getElementById("cantidadGasto");
const agregarBtn = document.getElementById("agregarBtn");
const listaGastos = document.getElementById("listaGastos");
const totalGastos = document.getElementById("totalGastos");

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

function guardarGastos() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

function agregarGasto() {
  const nombre = nombreGasto.value.trim();
  const cantidad = parseFloat(cantidadGasto.value);

  if (nombre !== "" && !isNaN(cantidad) && cantidad > 0) {
    gastos.push({ nombre, cantidad });
    guardarGastos();
    mostrarGastos();
    nombreGasto.value = "";
    cantidadGasto.value = "";
  }
}

function borrarGasto(index) {
  gastos.splice(index, 1);
  guardarGastos();
  mostrarGastos();
}

function mostrarGastos() {
  listaGastos.innerHTML = "";
  let total = 0;


  gastos.forEach((gasto, index) => {
    const div = document.createElement("div");
    div.textContent = `${gasto.nombre}: $${gasto.cantidad.toFixed(2)}`;

    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.addEventListener("click", () => borrarGasto(index));

    div.appendChild(botonBorrar);

    listaGastos.appendChild(div);
    total += gasto.cantidad;
  });

  totalGastos.textContent = `$${total.toFixed(2)}`;
}

agregarBtn.addEventListener("click", agregarGasto);

mostrarGastos();
