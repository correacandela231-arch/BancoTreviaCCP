// ELEMENTOS DEL HTML

const formulario = document.getElementById("loanForm");
const campoNombre = document.getElementById("nombre");
const campoTipo = document.getElementById("tipoPrestamo");
const campoMonto = document.getElementById("monto");
const campoInteres = document.getElementById("interes");
const campoPlazo = document.getElementById("plazo");

const resultado = document.getElementById("resultado");
const botonGuardar = document.getElementById("guardar");
const tablaHistorial = document.getElementById("tablaHistorial");
const botonLimpiarHistorial = document.getElementById("limpiarHistorial");

let simulacionActual = null;


// FORMATO DE PESOS ARGENTINOS

function formatoDinero(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor);
}


// TASAS DE INTERÉS MENSUALES SEGÚN EL MONTO

function calcularTasa(monto) {
  if (monto <= 100000) {
    return 5;
  } else if (monto <= 300000) {
    return 4;
  } else if (monto <= 500000) {
    return 3;
  } else {
    return 2;
  }
}


// ACTUALIZAR LA TASA AUTOMÁTICAMENTE

function actualizarTasa() {
  const monto = Number(campoMonto.value);

  if (monto > 0) {
    const tasa = calcularTasa(monto);
    campoInteres.value = tasa + "% mensual";
  } else {
    campoInteres.value = "Se calcula automáticamente";
  }
}


// CALCULAR LA CUOTA CON SISTEMA FRANCÉS

function calcularCuota(monto, tasa, meses) {
  const tasaMensual = tasa / 100;

  if (tasaMensual === 0) {
    return monto / meses;
  }

  const factor = Math.pow(1 + tasaMensual, meses);

  const cuota =
    monto * (tasaMensual * factor) / (factor - 1);

  return cuota;
}


// MOSTRAR RESULTADOS

formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = campoNombre.value.trim();
  const tipo = campoTipo.value;
  const monto = Number(campoMonto.value);
  const meses = Number(campoPlazo.value);

  if (!nombre || !tipo || monto <= 0 || meses <= 0) {
    alert("Por favor, completá todos los campos correctamente.");
    return;
  }

  const tasa = calcularTasa(monto);
  const cuota = calcularCuota(monto, tasa, meses);

  const total = cuota * meses;
  const intereses = total - monto;

  simulacionActual = {
    nombre: nombre,
    tipo: tipo,
    monto: monto,
    interes: tasa,
    meses: meses,
    cuota: cuota,
    total: total,
    intereses: intereses,
    fecha: new Date().toLocaleDateString("es-AR")
  };

  document.getElementById("cuota").textContent =
    formatoDinero(cuota);

  document.getElementById("resultadoMonto").textContent =
    formatoDinero(monto);

  document.getElementById("resultadoInteres").textContent =
    formatoDinero(intereses);

  document.getElementById("resultadoTotal").textContent =
    formatoDinero(total);

  document.getElementById("resultadoTasa").textContent =
    tasa + "% mensual";

  resultado.hidden = false;

  resultado.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});


// GUARDAR SIMULACIÓN EN EL HISTORIAL

botonGuardar.addEventListener("click", function() {
  if (!simulacionActual) {
    alert("Primero tenés que calcular un préstamo.");
    return;
  }

  let historial = JSON.parse(
    localStorage.getItem("trevia_historial") || "[]"
  );

  historial.push(simulacionActual);

  localStorage.setItem(
    "trevia_historial",
    JSON.stringify(historial)
  );

  alert("La simulación se guardó correctamente.");

  mostrarHistorial();

  simulacionActual = null;
  resultado.hidden = true;
});


// MOSTRAR HISTORIAL

function mostrarHistorial() {
  const historial = JSON.parse(
    localStorage.getItem("trevia_historial") || "[]"
  );

  tablaHistorial.innerHTML = "";

  if (historial.length === 0) {
    tablaHistorial.innerHTML = `
      <tr>
        <td colspan="7" class="sin-registros">
          Todavía no hay simulaciones guardadas.
        </td>
      </tr>
    `;
    return;
  }

  historial.forEach(function(item) {
    const fila = document.createElement("tr");

    const datos = [
      item.nombre || "—",
      item.tipo || "—",
      formatoDinero(Number(item.monto) || 0),
      item.interes != null ? item.interes + "% mensual" : "—",
      (item.meses || "—") + " meses",
      formatoDinero(Number(item.cuota) || 0),
      item.fecha || "—"
    ];

    datos.forEach(function(dato) {
      const celda = document.createElement("td");
      celda.textContent = dato;
      fila.appendChild(celda);
    });

    tablaHistorial.appendChild(fila);
  });
}


// ELIMINAR HISTORIAL

botonLimpiarHistorial.addEventListener("click", function() {
  const confirmar = confirm(
    "¿Estás segura de que querés eliminar todo el historial?"
  );

  if (confirmar) {
    localStorage.removeItem("trevia_historial");
    mostrarHistorial();
  }
});


// ACTUALIZAR TASA CUANDO CAMBIA EL MONTO

campoMonto.addEventListener("input", function() {
  actualizarTasa();
  simulacionActual = null;
  resultado.hidden = true;
});


// INVALIDAR RESULTADO SI CAMBIAN OTROS DATOS

[campoNombre, campoTipo, campoPlazo].forEach(function(campo) {
  campo.addEventListener("input", function() {
    simulacionActual = null;
    resultado.hidden = true;
  });

  campo.addEventListener("change", function() {
    simulacionActual = null;
    resultado.hidden = true;
  });
});


// LIMPIAR FORMULARIO

formulario.addEventListener("reset", function() {
  simulacionActual = null;
  resultado.hidden = true;

  setTimeout(function() {
    campoInteres.value = "Se calcula automáticamente";
  }, 0);
});


// CARGAR HISTORIAL AL ABRIR LA PÁGINA

mostrarHistorial();
