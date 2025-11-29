import { TimeSlotDTO } from './TimeSlotDTO';

/**
 * AppointmentResponseDTO - Response with appointment data
 */
export class AppointmentResponseDTO {
  id: string;
  patientId: string;
  dentistId?: string;
  timeSlot: TimeSlotDTO;
  status: string;
  reason: string;
  notes?: string;
  treatmentType?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  completedAt?: string;

  constructor(
    id: string,
    patientId: string,
    timeSlot: TimeSlotDTO,
    status: string,
    reason: string,
    createdAt: Date,
    updatedAt: Date,
    dentistId?: string,
    notes?: string,
    treatmentType?: string,
    confirmedAt?: Date,
    cancelledAt?: Date,
    completedAt?: Date
  ) {
    this.id = id;
    this.patientId = patientId;
    this.dentistId = dentistId;
    this.timeSlot = timeSlot;
    this.status = status;
    this.reason = reason;
    this.notes = notes;
    this.treatmentType = treatmentType;
    this.createdAt = createdAt.toISOString();
    this.updatedAt = updatedAt.toISOString();
    this.confirmedAt = confirmedAt?.toISOString();
    this.cancelledAt = cancelledAt?.toISOString();
    this.completedAt = completedAt?.toISOString();
  }
}
