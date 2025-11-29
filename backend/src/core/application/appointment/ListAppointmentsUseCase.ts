import { Appointment } from '../../domain/appointment/appointment.entity';
import { AppointmentStatus } from '../../domain/appointment/appointment-status.enum';
import { IAppointmentRepository } from './interfaces';

/**
 * ListAppointmentsUseCase - List appointments with filters
 */
export class ListAppointmentsUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(
    filters?: {
      patientId?: string;
      dentistId?: string;
      status?: AppointmentStatus;
      fromDate?: Date;
      toDate?: Date;
    }
  ): Promise<Appointment[]> {
    return this.appointmentRepository.findAll(filters);
  }
}
