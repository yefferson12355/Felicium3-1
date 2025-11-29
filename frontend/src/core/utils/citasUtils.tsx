// Constant data for appointments
export const dentistas = ['Dr. Pérez', 'Dra. López', 'Dr. Gómez', 'Dra. Rojas'];
export const tiposCita = ['Primera Consulta', 'Limpieza', 'Revisión', 'Endodoncia', 'Extracción', 'Blanqueamiento', 'Ortodoncia'];
export const duraciones = ['30 min', '45 min', '60 min', '90 min'];
export const lugares = ['Consultorio A', 'Consultorio B', 'Consultorio C'];
export const pacientes = [
  { id: 1, nombre: 'Juan Pérez', dni: '12345678' },
  { id: 2, nombre: 'María González', dni: '87654321' },
  { id: 3, nombre: 'Carlos Rodríguez', dni: '11223344' }
];

// Utility functions for appointments
export const calcularRangoFechas = (semanaOffset = 0) => {
  const fecha = new Date();
  // Set to Monday of the current week
  fecha.setDate(fecha.getDate() - fecha.getDay() + 1 + (semanaOffset * 7));
  
  const dias = [];
  for (let i = 0; i < 7; i++) {
    const dia = new Date(fecha);
    dia.setDate(fecha.getDate() + i);
    dias.push(dia);
  }
  
  const inicio = dias[0];
  const fin = dias[dias.length - 1];
  
  return `${inicio.getDate()} ${inicio.toLocaleString('es-ES', { month: 'short' })} - ${fin.getDate()} ${fin.toLocaleString('es-ES', { month: 'short' })} ${fin.getFullYear()}`;
};

export const getDiasSemana = () => ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

export const getHoras = () => ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

export const getRandomCitaColor = () => {
  const colors = ['#4CAF50', '#2196F3', '#FF9800'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const tieneCitaSimulada = () => Math.random() > 0.7;