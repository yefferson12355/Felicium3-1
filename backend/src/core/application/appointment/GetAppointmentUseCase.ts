import { Appointment } from '../../domain/appointment/appointment.entity';
import { IAppointmentRepository } from './interfaces';

/**
 * GetAppointmentUseCase - Get appointment by ID
 */
export class GetAppointmentUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(appointmentId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error(`Appointment with ID ${appointmentId} not found`);
    }

    return appointment;
  }
}
