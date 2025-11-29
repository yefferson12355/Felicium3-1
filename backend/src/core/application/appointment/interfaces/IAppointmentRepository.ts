import { Appointment } from '../../../domain/appointment/appointment.entity';
import { AppointmentStatus } from '../../../domain/appointment/appointment-status.enum';

/**
 * IAppointmentRepository - Contract for appointment persistence
 */
export interface IAppointmentRepository {
  /**
   * Save a new appointment
   */
  save(appointment: Appointment): Promise<void>;

  /**
   * Find appointment by ID
   */
  findById(id: string): Promise<Appointment | null>;

  /**
   * Find all appointments with optional filters
   */
  findAll(filters?: {
    patientId?: string;
    dentistId?: string;
    status?: AppointmentStatus;
    fromDate?: Date;
    toDate?: Date;
  }): Promise<Appointment[]>;

  /**
   * Find appointments by patient
   */
  findByPatientId(patientId: string): Promise<Appointment[]>;

  /**
   * Find appointments by dentist
   */
  findByDentistId(dentistId: string): Promise<Appointment[]>;

  /**
   * Find appointments by date
   */
  findByDate(date: Date): Promise<Appointment[]>;

  /**
   * Find appointments by date and time (for conflict detection)
   */
  findByDateAndTime(date: Date, startTime: string): Promise<Appointment[]>;

  /**
   * Update existing appointment
   */
  update(appointment: Appointment): Promise<void>;

  /**
   * Delete appointment
   */
  delete(id: string): Promise<void>;

  /**
   * Check if appointment exists
   */
  exists(id: string): Promise<boolean>;
}
