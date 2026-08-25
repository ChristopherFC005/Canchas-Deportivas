function generarHorarios() {
  const dias = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
  const horas = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];
  const grid = {};
  dias.forEach(dia => {
    grid[dia] = horas.map(hora => ({
      hora,
      estado: Math.random() > 0.6 ? "reservado" : "disponible"
    }));
  });
  return grid;
}

const CANCHAS = [
  { id: 1, nombre: "Complejo Deportivo Los Olivos - Cancha Futbol 1", distrito: "Los Olivos", deporte: "Futbol", direccion: "Av. Carlos Izaguirre 456", telefono: "01-5210001", horarios: generarHorarios() },
  { id: 2, nombre: "Losa Deportiva Sol de Oro", distrito: "Los Olivos", deporte: "Futbol", direccion: "Jr. Sol de Oro 220", telefono: "01-5210002", horarios: generarHorarios() },

  { id: 3, nombre: "Estadio Municipal San Martin - Cancha Principal", distrito: "San Martin", deporte: "Futbol", direccion: "Av. Perez Aranibar 800", telefono: "01-5330001", horarios: generarHorarios() },
  { id: 4, nombre: "Parque Zonal San Martin - Cancha Sintetica", distrito: "San Martin", deporte: "Futbol", direccion: "Av. Tomas Valle 150", telefono: "01-5330002", horarios: generarHorarios() },

  { id: 5, nombre: "Polideportivo Independencia - Cancha Futbol A", distrito: "Independencia", deporte: "Futbol", direccion: "Av. Tupac Amaru 3200", telefono: "01-5240001", horarios: generarHorarios() },
  { id: 6, nombre: "Losa Deportiva Tahuantinsuyo", distrito: "Independencia", deporte: "Futbol", direccion: "Jr. Tahuantinsuyo 90", telefono: "01-5240002", horarios: generarHorarios() }
];