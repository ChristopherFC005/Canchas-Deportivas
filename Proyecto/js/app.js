const formReserva = document.querySelector("#formReserva");
const resumenReserva = document.querySelector("#resumenReserva");
const modalReserva = new bootstrap.Modal(document.querySelector("#modalReserva"));

const campos = [
  { id: "nombre", etiqueta: "Nombre" },
  { id: "telefono", etiqueta: "Telefono" },
  { id: "deporte", etiqueta: "Deporte" },
  { id: "cancha", etiqueta: "Cancha" },
  { id: "fecha", etiqueta: "Fecha" },
  { id: "hora", etiqueta: "Hora" }
];

formReserva.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (!formReserva.checkValidity()) {
    formReserva.classList.add("was-validated");
    return;
  }

  resumenReserva.innerHTML = campos
    .map((campo) => {
      const valor = document.querySelector(`#${campo.id}`).value;
      return `<li class="list-group-item"><strong>${campo.etiqueta}:</strong> ${valor}</li>`;
    })
    .join("");

  modalReserva.show();
  formReserva.reset();
  formReserva.classList.remove("was-validated");
});
