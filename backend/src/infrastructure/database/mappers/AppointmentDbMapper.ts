/**
 * AppointmentDbMapper
 * 
 * Responsabilidad ÚNICA: Convertir entre filas de PostgreSQL y entidad Appointment
 * 
 * ┌─────────────────┐       ┌─────────────────┐
 * │   DB Row        │ ←───→ │   Appointment   │
 * │  (snake_case)   │       │   (camelCase)   │
 * └─────────────────┘       └─────────────────┘
 * 
 * NOTA: La tabla tiene 'fecha_hora' como timestamp único,
 * pero la entidad usa TimeSlot con date, startTime, endTime separados.
 */

import { Appointment } from '../../../core/domain/appointment/appointment.entity';
import { AppointmentStatus } from '../../../core/domain/appointment/appointment-status.enum';
import { TimeSlot } from '../../../core/domain/appointment/time-slot.entity';

/**
 * Interfaz que representa una fila de la tabla 'appointments'
 */
export interface AppointmentRow {
  id: string;
  patient_id: string;
  dentist_id: string | null;
  fecha_hora: Date | string;
  razon_consulta: string;
  status: string;
  notas: string | null;
  treatment_type: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  confirmed_at: Date | string | null;
  cancelled_at: Date | string | null;
  completed_at: Date | string | null;
  deleted_at?: Date | string | null;
}

/**
 * Interfaz para datos de persistencia (INSERT)
 */
export interface AppointmentInsertData {
  id: string;
  patient_id: string;
  dentist_id: string | null;
  fecha_hora: Date;
  razon_consulta: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export class AppointmentDbMapper {
  /**
   * Convierte una fila de PostgreSQL a entidad Appointment
   * 
   * @param row - Fila de la tabla appointments
   * @returns Appointment - Entidad de dominio reconstruida
   */
  static toDomain(row: AppointmentRow): Appointment {
    const fechaHora = this.toDate(row.fecha_hora);
    
    // Construir TimeSlot desde fecha_hora
    const timeSlot = this.buildTimeSlotFromTimestamp(fechaHora);

    return new Appointment(
      row.id,
      row.patient_id,
      timeSlot,
      row.razon_consulta || '',
      row.status as AppointmentStatus,
      row.dentist_id || undefined,
      row.notas || undefined,
      row.treatment_type || undefined,
      this.toDate(row.created_at),
      this.toDate(row.updated_at),
      row.confirmed_at ? this.toDate(row.confirmed_at) : undefined,
      row.cancelled_at ? this.toDate(row.cancelled_at) : undefined,
      row.completed_at ? this.toDate(row.completed_at) : undefined
    );
  }

  /**
   * Convierte múltiples filas a entidades
   * 
   * @param rows - Array de filas de la tabla appointments
   * @returns Array de entidades Appointment
   */
  static toDomainList(rows: AppointmentRow[]): Appointment[] {
    return rows.map(row => this.toDomain(row));
  }

  /**
   * Convierte una entidad Appointment a datos para INSERT
   * 
   * @param appointment - Entidad Appointment
   * @returns Objeto con campos mapeados para INSERT
   */
  static toInsertData(appointment: Appointment): AppointmentInsertData {
    const data = appointment.toJSON();
    
    // Combinar date y startTime en un timestamp
    const fechaHora = this.buildTimestampFromTimeSlot(data.timeSlot);

    return {
      id: data.id,
      patient_id: data.patientId,
      dentist_id: data.dentistId || null,
      fecha_hora: fechaHora,
      razon_consulta: data.reason,
      status: data.status,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  /**
   * Extrae los valores para un INSERT ordenados
   * 
   * @param appointment - Entidad Appointment
   * @returns Array de valores en orden para INSERT
   */
  static toInsertValues(appointment: Appointment): any[] {
    const data = this.toInsertData(appointment);
    return [
      data.id,
      data.patient_id,
      data.dentist_id,
      data.fecha_hora,
      data.razon_consulta,
      data.status,
      data.created_at,
      data.updated_at,
    ];
  }

  /**
   * Extrae los valores para un UPDATE ordenados
   * 
   * @param appointment - Entidad Appointment
   * @returns Array de valores en orden para UPDATE
   */
  static toUpdateValues(appointment: Appointment): any[] {
    const data = appointment.toJSON();
    const fechaHora = this.buildTimestampFromTimeSlot(data.timeSlot);

    return [
      data.patientId,
      data.dentistId || null,
      fechaHora,
      data.reason,
      data.status,
      data.notes || null,
      data.treatmentType || null,
      new Date(), // updated_at
      data.confirmedAt || null,
      data.cancelledAt || null,
      data.completedAt || null,
      data.id, // WHERE id = $12
    ];
  }

  /**
   * Construye un TimeSlot desde un timestamp de la DB
   * 
   * @param timestamp - Fecha/hora de la cita
   * @returns TimeSlot con date, startTime, endTime
   */
  private static buildTimeSlotFromTimestamp(timestamp: Date): TimeSlot {
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    const startTime = `${hours}:${minutes}`;
    
    // Asumir duración de 1 hora por defecto
    const endDate = new Date(timestamp);
    endDate.setHours(endDate.getHours() + 1);
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
    const endTime = `${endHours}:${endMinutes}`;

    return new TimeSlot(timestamp, startTime, endTime);
  }

  /**
   * Construye un timestamp desde TimeSlot data
   * 
   * @param timeSlotData - Datos del TimeSlot
   * @returns Date timestamp para la DB
   */
  private static buildTimestampFromTimeSlot(timeSlotData: { 
    date: string; 
    startTime: string; 
    endTime: string; 
  }): Date {
    const appointmentDate = new Date(timeSlotData.date);
    const [hours, minutes] = timeSlotData.startTime.split(':');
    appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return appointmentDate;
  }

  /**
   * Helper para convertir string/Date a Date
   */
  private static toDate(value: Date | string): Date {
    return value instanceof Date ? value : new Date(value);
  }
}
