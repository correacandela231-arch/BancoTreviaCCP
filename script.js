
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TREVIA CCP | Banca Personal</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="estilos.css">
</head>

<body>

  <header class="encabezado">
    <div class="logo">
      <span class="logo-nombre">TREVIA <span>CCP</span></span>
      <small>BANCA PERSONAL</small>
    </div>

    <nav>
      <a href="#inicio">Inicio</a>
      <a href="#simulador">Simulador</a>
      <a href="#historial">Historial</a>
      <a href="#informacion">Información</a>
    </nav>
  </header>

  <main>
    <section class="portada" id="inicio">
      <div class="portada-contenido">
        <p class="etiqueta">SOLUCIONES FINANCIERAS</p>
        <h1>Tu futuro comienza con una buena decisión.</h1>
        <p class="descripcion">
          En TREVIA CCP te ofrecemos una herramienta sencilla
          para simular préstamos y conocer tus posibilidades
          de financiación.
        </p>
        <a href="#simulador" class="boton-principal">Simular préstamo</a>
      </div>

      <div class="portada-decoracion">
        <div class="tarjeta-banco">
          <span>TREVIA CCP</span>
          <div class="chip"></div>
          <p>FINANCIAL SERVICES</p>
        </div>
      </div>
    </section>

    <section class="seccion-simulador" id="simulador">
      <div class="titulo-seccion">
        <p class="etiqueta">PLANIFICÁ TUS FINANZAS</p>
        <h2>Simulador de préstamos</h2>
        <p>Completá los datos y conocé el valor estimado de tus cuotas.</p>
      </div>

      <div class="contenedor-simulador">
        <form id="loanForm">

          <div class="campo">
            <label for="nombre">Nombre del cliente</label>
            <input type="text" id="nombre" placeholder="Ingresá tu nombre" required>
          </div>

          <div class="campo">
            <label for="tipoPrestamo">Tipo de préstamo</label>
            <select id="tipoPrestamo" required>
              <option value="">Seleccioná una opción</option>
              <option value="Personal">Personal</option>
              <option value="Consumo">Consumo</option>
              <option value="Estudiantil">Estudiantil</option>
              <option value="Emprendimiento">Emprendimiento</option>
            </select>
          </div>

          <div class="campo">
            <label for="monto">Monto solicitado (ARS)</label>
            <input type="number" id="monto" min="1" placeholder="Ej: 250000" required>
          </div>

          <div class="campo">
            <label for="interes">Tasa de interés mensual</label>
            <input type="text" id="interes" value="80%" readonly>
            <small>La tasa de interés mensual es fija y se calcula automáticamente.</small>
          </div>

          <div class="campo">
            <label for="plazo">Plazo de devolución</label>
            <select id="plazo" required>
              <option value="">Seleccioná los meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
              <option value="36">36 meses</option>
              <option value="48">48 meses</option>
            </select>
          </div>

          <div class="botones-formulario">
            <button type="submit" class="boton-principal">Calcular préstamo</button>
            <button type="reset" class="boton-secundario">Limpiar</button>
          </div>
        </form>

        <div class="resultado" id="resultado" hidden>
          <p class="etiqueta">RESULTADO DE LA SIMULACIÓN</p>
          <h3>Tu préstamo estimado</h3>

          <div class="cuota-principal">
            <span>Cuota mensual aproximada</span>
            <strong id="cuota">$ 0</strong>
          </div>

          <div class="detalle-resultados">
            <div>
              <span>Monto solicitado</span>
              <strong id="resultadoMonto">$ 0</strong>
            </div>
            <div>
              <span>Intereses totales</span>
              <strong id="resultadoInteres">$ 0</strong>
            </div>
            <div>
              <span>Total a devolver</span>
              <strong id="resultadoTotal">$ 0</strong>
            </div>
            <div>
              <span>Tasa mensual</span>
              <strong id="resultadoTasa">80%</strong>
            </div>
          </div>

          <button type="button" id="guardar" class="boton-principal boton-guardar">
            Guardar simulación
          </button>

          <p class="aviso">
            Simulación orientativa con fines educativos.
            No representa una oferta financiera real.
          </p>
        </div>
      </div>
    </section>

    <section class="seccion-historial" id="historial">
      <div class="titulo-seccion">
        <p class="etiqueta">REGISTROS</p>
        <h2>Historial de simulaciones</h2>
        <p>Consultá las simulaciones guardadas.</p>
      </div>

      <div class="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Tasa mensual</th>
              <th>Plazo</th>
              <th>Cuota</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody id="tablaHistorial">
            <tr>
              <td colspan="7" class="sin-registros">
                Todavía no hay simulaciones guardadas.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button type="button" id="limpiarHistorial" class="boton-secundario">
        Eliminar historial
      </button>
    </section>

    <section class="informacion" id="informacion">
      <p class="etiqueta">TREVIA CCP</p>
      <h2>Información del simulador</h2>
      <p>
        Esta herramienta permite calcular cuotas estimadas de préstamos
        utilizando el sistema de amortización francés, que mantiene una
        cuota mensual fija durante el plazo seleccionado.
      </p>
      <p>
        La tasa de interés mensual utilizada es del 80%,
        definida para este proyecto educativo.
      </p>
    </section>
  </main>

  <footer>
    <div class="logo">
      <span class="logo-nombre">TREVIA <span>CCP</span></span>
      <small>BANCA PERSONAL</small>
    </div>
    <p>© 2026 TREVIA CCP. Proyecto educativo.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
