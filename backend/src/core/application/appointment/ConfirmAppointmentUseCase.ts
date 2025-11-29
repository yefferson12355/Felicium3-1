import { Appointment } from '../../domain/appointment/appointment.entity';
import { IAppointmentRepository } from './interfaces';

/**
 * ConfirmAppointmentUseCase - Confirm a pending appointment
 */
export class ConfirmAppointmentUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(appointmentId: string, dentistId?: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error(`Appointment with ID ${appointmentId} not found`);
    }

    // Confirm appointment (business rule validation)
    appointment.confirm();

    // Assign dentist if provided
    if (dentistId) {
      appointment.assignDentist(dentistId);
    }

    // Save updated appointment
    await this.appointmentRepository.update(appointment);

    return appointment;
  }
}
