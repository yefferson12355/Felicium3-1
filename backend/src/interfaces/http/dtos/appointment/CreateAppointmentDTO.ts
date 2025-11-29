import { TimeSlotDTO } from './TimeSlotDTO';

/**
 * CreateAppointmentDTO - Input for creating appointment
 */
export class CreateAppointmentDTO {
  patientId: string;
  timeSlot: TimeSlotDTO;
  reason: string;
  treatmentType?: string;
  dentistId?: string;

  constructor(
    patientId: string,
    timeSlot: TimeSlotDTO,
    reason: string,
    treatmentType?: string,
    dentistId?: string
  ) {
    this.patientId = patientId;
    this.timeSlot = timeSlot;
    this.reason = reason;
    this.treatmentType = treatmentType;
    this.dentistId = dentistId;
  }
}
