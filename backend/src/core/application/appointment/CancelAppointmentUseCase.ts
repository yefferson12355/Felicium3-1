import { Appointment } from '../../domain/appointment/appointment.entity';
import { IAppointmentRepository } from './interfaces';

/**
 * CancelAppointmentUseCase - Cancel an appointment
 */
export class CancelAppointmentUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(appointmentId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error(`Appointment with ID ${appointmentId} not found`);
    }

    // Cancel appointment (business rule validation)
    appointment.cancel();

    // Save updated appointment
    await this.appointmentRepository.update(appointment);

    return appointment;
  }
}
