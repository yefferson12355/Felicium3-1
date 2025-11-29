import { AppointmentStatus } from './appointment-status.enum';
import { TimeSlot } from './time-slot.entity';

/**
 * Appointment Entity - Represents a dental appointment
 */
export class Appointment {
  private id: string;
  private patientId: string;
  private dentistId?: string;                // Dentista asignado (opcional al crear)
  private timeSlot: TimeSlot;
  private status: AppointmentStatus;
  private reason: string;                    // Motivo de la cita
  private notes?: string;                    // Notas adicionales
  private treatmentType?: string;            // Tipo de tratamiento
  private createdAt: Date;
  private updatedAt: Date;
  private confirmedAt?: Date;
  private cancelledAt?: Date;
  private completedAt?: Date;

  constructor(
    id: string,
    patientId: string,
    timeSlot: TimeSlot,
    reason: string,
    status: AppointmentStatus = AppointmentStatus.PENDING,
    dentistId?: string,
    notes?: string,
    treatmentType?: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    confirmedAt?: Date,
    cancelledAt?: Date,
    completedAt?: Date
  ) {
    this.id = id;
    this.patientId = patientId;
    this.timeSlot = timeSlot;
    this.reason = reason;
    this.status = status;
    this.dentistId = dentistId;
    this.notes = notes;
    this.treatmentType = treatmentType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.confirmedAt = confirmedAt;
    this.cancelledAt = cancelledAt;
    this.completedAt = completedAt;
  }

  /**
   * Validate appointment time slot
   */
  static validateTimeSlot(timeSlot: TimeSlot): boolean {
    return (
      TimeSlot.isFutureDate(timeSlot.getDate()) &&
      TimeSlot.isWeekday(timeSlot.getDate()) &&
      TimeSlot.isBusinessHours(timeSlot.getStartTime())
    );
  }

  /**
   * Confirm appointment (PENDING -> CONFIRMED)
   */
  confirm(): void {
    if (this.status !== AppointmentStatus.PENDING) {
      throw new Error('Only PENDING appointments can be confirmed');
    }
    this.status = AppointmentStatus.CONFIRMED;
    this.confirmedAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Assign dentist
   */
  assignDentist(dentistId: string): void {
    this.dentistId = dentistId;
    this.updatedAt = new Date();
  }

  /**
   * Mark as in progress
   */
  startAppointment(): void {
    if (this.status !== AppointmentStatus.CONFIRMED) {
      throw new Error('Only CONFIRMED appointments can be started');
    }
    this.status = AppointmentStatus.IN_PROGRESS;
    this.updatedAt = new Date();
  }

  /**
   * Complete appointment (IN_PROGRESS -> COMPLETED)
   */
  complete(): void {
    if (this.status !== AppointmentStatus.IN_PROGRESS) {
      throw new Error('Only IN_PROGRESS appointments can be completed');
    }
    this.status = AppointmentStatus.COMPLETED;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Cancel appointment
   */
  cancel(): void {
    if (
      this.status === AppointmentStatus.COMPLETED ||
      this.status === AppointmentStatus.CANCELLED
    ) {
      throw new Error('Cannot cancel COMPLETED or already CANCELLED appointments');
    }
    this.status = AppointmentStatus.CANCELLED;
    this.cancelledAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Mark as no-show
   */
  markAsNoShow(): void {
    if (this.status !== AppointmentStatus.CONFIRMED) {
      throw new Error('Only CONFIRMED appointments can be marked as no-show');
    }
    this.status = AppointmentStatus.NO_SHOW;
    this.updatedAt = new Date();
  }

  /**
   * Update notes
   */
  updateNotes(notes: string): void {
    this.notes = notes;
    this.updatedAt = new Date();
  }

  /**
   * Set treatment type
   */
  setTreatmentType(treatmentType: string | undefined): void {
    this.treatmentType = treatmentType;
    this.updatedAt = new Date();
  }

  /**
   * Check if appointment is upcoming
   */
  isUpcoming(): boolean {
    return (
      this.status === AppointmentStatus.CONFIRMED &&
      this.timeSlot.getDate() > new Date()
    );
  }

  /**
   * Check if appointment is past
   */
  isPast(): boolean {
    return this.timeSlot.getDate() < new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getPatientId(): string {
    return this.patientId;
  }

  getDentistId(): string | undefined {
    return this.dentistId;
  }

  getTimeSlot(): TimeSlot {
    return this.timeSlot;
  }

  getStatus(): AppointmentStatus {
    return this.status;
  }

  getReason(): string {
    return this.reason;
  }

  getNotes(): string | undefined {
    return this.notes;
  }

  getTreatmentType(): string | undefined {
    return this.treatmentType;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getConfirmedAt(): Date | undefined {
    return this.confirmedAt;
  }

  getCancelledAt(): Date | undefined {
    return this.cancelledAt;
  }

  getCompletedAt(): Date | undefined {
    return this.completedAt;
  }

  /**
   * Convert to plain object
   */
  toJSON(): any {
    return {
      id: this.id,
      patientId: this.patientId,
      dentistId: this.dentistId,
      timeSlot: this.timeSlot.toJSON(),
      status: this.status,
      reason: this.reason,
      notes: this.notes,
      treatmentType: this.treatmentType,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      confirmedAt: this.confirmedAt,
      cancelledAt: this.cancelledAt,
      completedAt: this.completedAt,
    };
  }

  /**
   * Create from plain object
   */
  static fromJSON(data: any): Appointment {
    return new Appointment(
      data.id,
      data.patientId,
      TimeSlot.fromJSON(data.timeSlot),
      data.reason,
      data.status,
      data.dentistId,
      data.notes,
      data.treatmentType,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.confirmedAt ? new Date(data.confirmedAt) : undefined,
      data.cancelledAt ? new Date(data.cancelledAt) : undefined,
      data.completedAt ? new Date(data.completedAt) : undefined
    );
  }
}
