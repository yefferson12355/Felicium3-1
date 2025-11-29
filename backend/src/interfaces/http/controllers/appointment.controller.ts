import { Request, Response } from 'express';
import { CreateAppointmentUseCase } from '../../../core/application/appointment/CreateAppointmentUseCase';
import { GetAppointmentUseCase } from '../../../core/application/appointment/GetAppointmentUseCase';
import { ListAppointmentsUseCase } from '../../../core/application/appointment/ListAppointmentsUseCase';
import { CancelAppointmentUseCase } from '../../../core/application/appointment/CancelAppointmentUseCase';
import { ConfirmAppointmentUseCase } from '../../../core/application/appointment/ConfirmAppointmentUseCase';
import { GetAvailableSlotsUseCase } from '../../../core/application/appointment/GetAvailableSlotsUseCase';
import { CreateAppointmentDTO, AppointmentResponseDTO, TimeSlotDTO } from '../dtos/appointment';
import { TimeSlot } from '../../../core/domain/appointment/time-slot.entity';

/**
 * AppointmentController - Handles appointment endpoints
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
  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { patientId, timeSlot, reason, treatmentType, dentistId } = req.body;

      // Validate input
      if (!patientId || !timeSlot || !reason) {
        res.status(400).json({ error: 'Missing required fields: patientId, timeSlot, reason' });
        return;
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
        message: 'Appointment created successfully',
        appointment: responseDTO,
      });
    } catch (error: any) {
      console.error('Create appointment error:', error);
      res.status(400).json({ error: error.message || 'Failed to create appointment' });
    }
  }

  /**
   * GET /appointments/:id - Get appointment by ID
   */
  async getAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const appointment = await this.getAppointmentUseCase.execute(id);
      const responseDTO = this.mapToResponseDTO(appointment);

      res.status(200).json(responseDTO);
    } catch (error: any) {
      console.error('Get appointment error:', error);
      res.status(404).json({ error: error.message || 'Appointment not found' });
    }
  }

  /**
   * GET /appointments - List appointments with filters
   */
  async listAppointments(req: Request, res: Response): Promise<void> {
    try {
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
        count: responseDTOs.length,
        appointments: responseDTOs,
      });
    } catch (error: any) {
      console.error('List appointments error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * POST /appointments/:id/confirm - Confirm appointment
   */
  async confirmAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { dentistId } = req.body;

      const appointment = await this.confirmAppointmentUseCase.execute(id, dentistId);
      const responseDTO = this.mapToResponseDTO(appointment);

      res.status(200).json({
        message: 'Appointment confirmed successfully',
        appointment: responseDTO,
      });
    } catch (error: any) {
      console.error('Confirm appointment error:', error);
      res.status(400).json({ error: error.message || 'Failed to confirm appointment' });
    }
  }

  /**
   * DELETE /appointments/:id - Cancel appointment
   */
  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const appointment = await this.cancelAppointmentUseCase.execute(id);
      const responseDTO = this.mapToResponseDTO(appointment);

      res.status(200).json({
        message: 'Appointment cancelled successfully',
        appointment: responseDTO,
      });
    } catch (error: any) {
      console.error('Cancel appointment error:', error);
      res.status(400).json({ error: error.message || 'Failed to cancel appointment' });
    }
  }

  /**
   * GET /appointments/available-slots?date=YYYY-MM-DD&dentistId=id - Get available time slots
   */
  async getAvailableSlots(req: Request, res: Response): Promise<void> {
    try {
      const { date, dentistId } = req.query;

      if (!date) {
        res.status(400).json({ error: 'Missing required query param: date (YYYY-MM-DD)' });
        return;
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
        date,
        count: slotDTOs.length,
        availableSlots: slotDTOs,
      });
    } catch (error: any) {
      console.error('Get available slots error:', error);
      res.status(400).json({ error: error.message || 'Failed to get available slots' });
    }
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
