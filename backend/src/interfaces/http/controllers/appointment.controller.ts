import { Request, Response, NextFunction } from 'express';
import { CreateAppointmentUseCase } from '../../../core/application/appointment/CreateAppointmentUseCase';
import { GetAppointmentUseCase } from '../../../core/application/appointment/GetAppointmentUseCase';
import { ListAppointmentsUseCase } from '../../../core/application/appointment/ListAppointmentsUseCase';
import { CancelAppointmentUseCase } from '../../../core/application/appointment/CancelAppointmentUseCase';
import { ConfirmAppointmentUseCase } from '../../../core/application/appointment/ConfirmAppointmentUseCase';
import { GetAvailableSlotsUseCase } from '../../../core/application/appointment/GetAvailableSlotsUseCase';
import { CreateAppointmentDTO, AppointmentResponseDTO, TimeSlotDTO } from '../dtos/appointment';
import { TimeSlot } from '../../../core/domain/appointment/time-slot.entity';
import { 
  ValidationError, 
  AppointmentNotFoundError,
  InvalidInputError
} from '../../../shared/errors';

/**
 * AppointmentController - Handles appointment endpoints
 * 
 * Sin try/catch - los errores se propagan al globalErrorHandler
 */
export class AppointmentController {
  constructor(
    private createAppointmentUseCase: CreateAppointmentUseCase,
    private getAppointmentUseCase: GetAppointmentUseCase,
    private listAppointmentsUseCase: ListAppointmentsUseCase,
    private cancelAppointmentUseCase: CancelAppointmentUseCase,
    private confirmAppointmentUseCase: ConfirmAppointmentUseCase,
    private getAvailableSlotsUseCase: GetAvailableSlotsUseCase
  ) {}

  /**
   * POST /appointments - Create new appointment
   */
  async createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { patientId, timeSlot, reason, treatmentType, dentistId } = req.body;

    // Validate input
    if (!patientId || !timeSlot || !reason) {
      throw new ValidationError('Campos requeridos faltantes', {
        patientId: !patientId ? ['El ID del paciente es requerido'] : [],
        timeSlot: !timeSlot ? ['El horario es requerido'] : [],
        reason: !reason ? ['El motivo es requerido'] : [],
      });
    }

    // Create TimeSlot from DTO
    const slot = new TimeSlot(new Date(timeSlot.date), timeSlot.startTime, timeSlot.endTime);

    // Call use case
    const appointment = await this.createAppointmentUseCase.execute(
      patientId,
      slot,
      reason,
      treatmentType,
      dentistId
    );

    // Create response DTO
    const responseDTO = this.mapToResponseDTO(appointment);

    res.status(201).json({
      success: true,
      message: 'Cita creada exitosamente',
      data: responseDTO,
    });
  }

  /**
   * GET /appointments/:id - Get appointment by ID
   */
  async getAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const appointment = await this.getAppointmentUseCase.execute(id);
    
    if (!appointment) {
      throw new AppointmentNotFoundError(id);
    }

    const responseDTO = this.mapToResponseDTO(appointment);

    res.status(200).json({
      success: true,
      data: responseDTO,
    });
  }

  /**
   * GET /appointments - List appointments with filters
   */
  async listAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { patientId, dentistId, status, fromDate, toDate } = req.query;

    const filters: any = {};
    if (patientId) filters.patientId = patientId;
    if (dentistId) filters.dentistId = dentistId;
    if (status) filters.status = status;
    if (fromDate) filters.fromDate = new Date(fromDate as string);
    if (toDate) filters.toDate = new Date(toDate as string);

    const appointments = await this.listAppointmentsUseCase.execute(filters);
    const responseDTOs = appointments.map((apt) => this.mapToResponseDTO(apt));

    res.status(200).json({
      success: true,
      data: responseDTOs,
      count: responseDTOs.length,
    });
  }

  /**
   * POST /appointments/:id/confirm - Confirm appointment
   */
  async confirmAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { dentistId } = req.body;

    const appointment = await this.confirmAppointmentUseCase.execute(id, dentistId);
    const responseDTO = this.mapToResponseDTO(appointment);

    res.status(200).json({
      success: true,
      message: 'Cita confirmada exitosamente',
      data: responseDTO,
    });
  }

  /**
   * DELETE /appointments/:id - Cancel appointment
   */
  async cancelAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const appointment = await this.cancelAppointmentUseCase.execute(id);
    const responseDTO = this.mapToResponseDTO(appointment);

    res.status(200).json({
      success: true,
      message: 'Cita cancelada exitosamente',
      data: responseDTO,
    });
  }

  /**
   * GET /appointments/available-slots?date=YYYY-MM-DD&dentistId=id - Get available time slots
   */
  async getAvailableSlots(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { date, dentistId } = req.query;

    if (!date) {
      throw new InvalidInputError('date', 'El parámetro date es requerido (formato YYYY-MM-DD)');
    }

    const slots = await this.getAvailableSlotsUseCase.execute(
      new Date(date as string),
      dentistId as string | undefined
    );

    const slotDTOs = slots.map(
      (slot) =>
        new TimeSlotDTO(
          slot.getDate().toISOString().split('T')[0],
          slot.getStartTime(),
          slot.getEndTime()
        )
    );

    res.status(200).json({
      success: true,
      data: {
        date,
        availableSlots: slotDTOs,
      },
      count: slotDTOs.length,
    });
  }

  /**
   * Map Appointment entity to ResponseDTO
   */
  private mapToResponseDTO(appointment: any): AppointmentResponseDTO {
    const timeSlot = appointment.getTimeSlot();
    return new AppointmentResponseDTO(
      appointment.getId(),
      appointment.getPatientId(),
      new TimeSlotDTO(
        timeSlot.getDate().toISOString().split('T')[0],
        timeSlot.getStartTime(),
        timeSlot.getEndTime()
      ),
      appointment.getStatus(),
      appointment.getReason(),
      appointment.getCreatedAt(),
      appointment.getUpdatedAt(),
      appointment.getDentistId(),
      appointment.getNotes(),
      appointment.getTreatmentType(),
      appointment.getConfirmedAt(),
      appointment.getCancelledAt(),
      appointment.getCompletedAt()
    );
  }
}
