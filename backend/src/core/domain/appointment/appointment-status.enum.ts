/**
 * Appointment statuses
 */
export enum AppointmentStatus {
  PENDING = 'PENDING',           // Cita pendiente por confirmar
  CONFIRMED = 'CONFIRMED',       // Cita confirmada
  IN_PROGRESS = 'IN_PROGRESS',   // Cita en progreso
  COMPLETED = 'COMPLETED',       // Cita completada
  CANCELLED = 'CANCELLED',       // Cita cancelada
  NO_SHOW = 'NO_SHOW',           // Paciente no asistió
}
