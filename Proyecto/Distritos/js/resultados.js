function buscarCanchas() {
  return CANCHAS.filter(c =>
    c.distrito === DISTRITO_ACTUAL && c.deporte === "Futbol"
  );
}

function contarDisponibles(cancha) {
  let total = 0;
  Object.values(cancha.horarios).forEach(dia => {
    total += dia.filter(slot => slot.estado === "disponible").length;
  });
  return total;
}

function crearBadgeDisponibilidad(cantidad) {
  if (cantidad === 0) {
    return `<span class="badge text-bg-danger">Sin horarios libres</span>`;
  }
  if (cantidad <= 4) {
    return `<span class="badge text-bg-warning text-dark">${cantidad} horarios libres</span>`;
  }
  return `<span class="badge text-bg-success">${cantidad} horarios libres</span>`;
}

function crearCardCancha(cancha) {
  const dias = Object.keys(cancha.horarios);

  const filasHoras = cancha.horarios[dias[0]].map((_, i) => {
    const celdas = dias.map(dia => {
      const slot = cancha.horarios[dia][i];
      return `<td class="slot ${slot.estado}"
                  data-cancha="${cancha.id}"
                  data-dia="${dia}"
                  data-hora="${slot.hora}">
                ${slot.estado === "disponible" ? "" : "X"}
              </td>`;
    }).join("");
    return `<tr><td class="hora-label">${cancha.horarios[dias[0]][i].hora}</td>${celdas}</tr>`;
  }).join("");

  const encabezadoDias = dias.map(d => `<th>${d}</th>`).join("");
  const disponibles = contarDisponibles(cancha);

  return `
    <article class="cancha-card">
      <div class="cancha-header">
        <div>
          <h3><i class="bi bi-dribbble text-success me-2"></i>${cancha.nombre}</h3>
          <p class="direccion"><i class="bi bi-geo-alt-fill me-1"></i>${cancha.direccion}</p>
        </div>
        ${crearBadgeDisponibilidad(disponibles)}
      </div>
      <div class="table-responsive">
        <table class="table table-bordered align-middle text-center tabla-horarios mb-0">
          <thead><tr><th></th>${encabezadoDias}</tr></thead>
          <tbody>${filasHoras}</tbody>
        </table>
      </div>
      <div class="cancha-footer">
        <div class="leyenda-color">
          <span><span class="caja disponible"></span>Disponible</span>
          <span><span class="caja reservado"></span>Reservado</span>
        </div>
        <p class="mb-0 text-secondary small"><i class="bi bi-telephone-fill me-1"></i>${cancha.telefono}</p>
      </div>
    </article>
  `;
}

function actualizarStats(resultados) {
  const totalCanchas = resultados.length;
  const totalDisponibles = resultados.reduce((acc, c) => acc + contarDisponibles(c), 0);
  const elCanchas = document.getElementById("statCanchas");
  const elDisponibles = document.getElementById("statDisponibles");
  if (elCanchas) elCanchas.innerText = totalCanchas;
  if (elDisponibles) elDisponibles.innerText = totalDisponibles;
}

function mostrarResultados() {
  const resultados = buscarCanchas();
  const contenedor = document.getElementById("listaResultados");

  actualizarStats(resultados);

  if (resultados.length === 0) {
    contenedor.innerHTML = `<p class="sin-resultados">No hay canchas de futbol registradas en ${DISTRITO_ACTUAL}.</p>`;
    return;
  }

  contenedor.innerHTML = resultados.map(crearCardCancha).join("");
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("disponible")) {
    const { dia, hora } = e.target.dataset;
    if (confirm(`Reservar ${dia} a las ${hora}?`)) {
      e.target.classList.remove("disponible");
      e.target.classList.add("reservado");
      e.target.innerText = "X";
    }
  }
});

document.getElementById("nombreDistrito").innerText = DISTRITO_ACTUAL;
mostrarResultados();