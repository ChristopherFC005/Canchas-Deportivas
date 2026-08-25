function buscarCanchas() {
  return CANCHAS.filter(c =>
    c.distrito === DISTRITO_ACTUAL && c.deporte === "Futbol"
  );
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

  return `
    <section class="card-cancha">
      <h3>${cancha.nombre}</h3>
      <p class="direccion">${cancha.direccion} - Tel: ${cancha.telefono}</p>
      <div class="tabla-horarios-wrap">
        <table class="tabla-horarios">
          <thead><tr><th></th>${encabezadoDias}</tr></thead>
          <tbody>${filasHoras}</tbody>
        </table>
      </div>
      <div class="leyenda">
        <span><span class="caja disponible"></span> Disponible</span>
        <span><span class="caja reservado"></span> Reservado</span>
      </div>
    </section>
  `;
}

function mostrarResultados() {
  const resultados = buscarCanchas();
  const contenedor = document.getElementById("listaResultados");

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