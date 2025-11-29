import { Appointment } from '../../domain/appointment/appointment.entity';
import { AppointmentStatus } from '../../domain/appointment/appointment-status.enum';
import { TimeSlot } from '../../domain/appointment/time-slot.entity';
import { IAppointmentRepository } from './interfaces';
import { randomUUID } from 'crypto';

/**
 * CreateAppointmentUseCase - Create a new appointment
 */
export class CreateAppointmentUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(
    patientId: string,
    timeSlot: TimeSlot,
    reason: string,
    treatmentType?: string,
    dentistId?: string
  ): Promise<Appointment> {
    // Validate time slot
    if (!Appointment.validateTimeSlot(timeSlot)) {
      throw new Error('Invalid time slot: must be future date, weekday, and business hours (8-18)');
    }

    // Check for conflicting appointments (same dentist or general time conflict)
    const conflictingAppointments = await this.appointmentRepository.findByDateAndTime(
      timeSlot.getDate(),
      timeSlot.getStartTime()
    );

    if (conflictingAppointments.length > 0 && dentistId) {
      const dentistConflict = conflictingAppointments.find(
        (apt: Appointment) => apt.getDentistId() === dentistId
      );
      if (dentistConflict) {
        throw new Error('Dentist already has an appointment at this time');
      }
    }

    // Create appointment
    const appointment = new Appointment(
      randomUUID(),
      patientId,
      timeSlot,
      reason,
      AppointmentStatus.PENDING,
      dentistId
    );

    appointment.setTreatmentType(treatmentType);

    // Save to repository
    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}
