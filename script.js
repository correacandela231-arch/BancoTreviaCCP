
// ========================================
// TREVIA CCP - SIMULADOR DE PRESTAMOS
// ========================================

// ELEMENTOS DEL HTML

const formulario = document.getElementById("loanForm");
const montoInput = document.getElementById("monto");
const plazoInput = document.getElementById("plazo");
const interesInput = document.getElementById("interes");
const resultado = document.getElementById("resultado");

const moneda = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 2
});

let simulacionActual = null;


// ========================================
// 1. CALCULAR TASA SEGUN EL MONTO
// ========================================

function obtenerTasaBase(monto) {

  if (monto <= 100000) {
    return 54;
  }

  if (monto <= 300000) {
    return 58;
  }

  if (monto <= 600000) {
    return 62;
  }

  if (monto <= 1000000) {
    return 66;
  }

  return 70;
}


// ========================================
// 2. CALCULAR ADICIONAL SEGUN LOS MESES
// ========================================

function obtenerAdicional(plazo) {

  if (plazo <= 12) {
    return 0;
  }

  if (plazo <= 18) {
    return 2;
  }

  if (plazo <= 24) {
    return 4;
  }

  if (plazo <= 36) {
    return 6;
  }

  return 8;
}


// ========================================
// 3. CALCULAR TASA FINAL
// ========================================

function calcularTasa(monto, plazo) {

  const tasaBase = obtenerTasaBase(monto);

  const adicional = obtenerAdicional(plazo);

  const tasaFinal = tasaBase + adicional;

  return Math.min(tasaFinal, 71);
}


// ========================================
// 4. ACTUALIZAR TASA AUTOMATICAMENTE
// ========================================

function actualizarTasa() {

  const monto = Number(montoInput.value);
  const plazo = Number(plazoInput.value);

  if (monto > 0 && plazo > 0) {

    const tasa = calcularTasa(monto, plazo);

    interesInput.value = tasa + "% TNA";

  } else {

    interesInput.value = "Se calcula automáticamente";

  }
}

montoInput.addEventListener("input", actualizarTasa);

plazoInput.addEventListener("change", actualizarTasa);


// ========================================
// 5. CALCULAR PRESTAMO
// ========================================

formulario.addEventListener("submit", function(event) {

  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();

  const tipo = document.getElementById("tipoPrestamo").value;

  const monto = Number(montoInput.value);

  const plazo = Number(plazoInput.value);


  if (!nombre || !tipo || monto <= 0 || !plazo) {

    alert("Completá todos los campos correctamente.");

    return;

  }


  // OBTENER TASA

  const tasaAnual = calcularTasa(monto, plazo);

  // CONVERTIR TNA A TASA MENSUAL

  const tasaMensual = tasaAnual / 100 / 12;


  // FORMULA DEL SISTEMA FRANCES

  const cuota = monto * tasaMensual /
    (1 - Math.pow(1 + tasaMensual, -plazo));


  // CALCULAR TOTALES

  const total = cuota * plazo;

  const intereses = total - monto;


  // GUARDAR SIMULACION ACTUAL

  simulacionActual = {

    nombre: nombre,

    tipo: tipo,

    monto: monto,

    tasaAnual: tasaAnual,

    tasaMensual: tasaMensual,

    plazo: plazo,

    cuota: cuota,

    total: total,

    intereses: intereses,

    fecha: new Date().toLocaleDateString("es-AR")

  };


  // MOSTRAR RESULTADOS

  document.getElementById("cuota").textContent =
    moneda.format(cuota);

  document.getElementById("resultadoMonto").textContent =
    moneda.format(monto);

  document.getElementById("resultadoInteres").textContent =
    moneda.format(intereses);

  document.getElementById("resultadoTotal").textContent =
    moneda.format(total);

  document.getElementById("resultadoTasa").textContent =
    tasaAnual + "%";

  document.getElementById("resultadoMensual").textContent =
    (tasaMensual * 100).toFixed(2) + "%";

  interesInput.value = tasaAnual + "% TNA";


  // MOSTRAR PANEL DE RESULTADOS

  resultado.hidden = false;

});


// ========================================
// 6. GUARDAR SIMULACION
// ========================================

document.getElementById("guardar").addEventListener("click", function() {

  if (!simulacionActual) {

    alert("Primero calculá un préstamo.");

    return;

  }

  let historial = JSON.parse(
    localStorage.getItem("historialTREVIA")
  ) || [];


  historial.push(simulacionActual);


  localStorage.setItem(
    "historialTREVIA",
    JSON.stringify(historial)
  );


  mostrarHistorial();


  alert("¡Simulación guardada correctamente!");

  simulacionActual = null;

});


// ========================================
// 7. MOSTRAR HISTORIAL
// ========================================

function mostrarHistorial() {

  const tabla = document.getElementById("tablaHistorial");

  const historial = JSON.parse(
    localStorage.getItem("historialTREVIA")
  ) || [];


  tabla.innerHTML = "";


  if (historial.length === 0) {

    tabla.innerHTML = `
      <tr>
        <td colspan="7" class="sin-registros">
          Todavía no hay simulaciones guardadas.
        </td>
      </tr>
    `;

    return;

  }


  historial.forEach(function(simulacion) {

    const fila = document.createElement("tr");

    const datos = [

      simulacion.nombre,

      simulacion.tipo,

      moneda.format(simulacion.monto),

      simulacion.tasaAnual + "%",

      simulacion.plazo + " meses",

      moneda.format(simulacion.cuota),

      simulacion.fecha

    ];


    datos.forEach(function(dato) {

      const celda = document.createElement("td");

      celda.textContent = dato;

      fila.appendChild(celda);

    });


    tabla.appendChild(fila);

  });

}


// ========================================
// 8. ELIMINAR HISTORIAL
// ========================================

document.getElementById("limpiarHistorial")
.addEventListener("click", function() {

  if (confirm("¿Querés eliminar todo el historial?")) {

    localStorage.removeItem("historialTREVIA");

    mostrarHistorial();

  }

});


// ========================================
// 9. LIMPIAR FORMULARIO
// ========================================

formulario.addEventListener("reset", function() {

  setTimeout(function() {

    resultado.hidden = true;

    interesInput.value = "Se calcula automáticamente";

    simulacionActual = null;

  }, 0);

});


// ========================================
// 10. CARGAR HISTORIAL AL INICIAR
// ========================================

mostrarHistorial();
