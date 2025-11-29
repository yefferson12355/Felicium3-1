"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const appointment_1 = require("../dtos/appointment");
const time_slot_entity_1 = require("../../../core/domain/appointment/time-slot.entity");
/**
 * AppointmentController - Handles appointment endpoints
 */
class AppointmentController {
    constructor(createAppointmentUseCase, getAppointmentUseCase, listAppointmentsUseCase, cancelAppointmentUseCase, confirmAppointmentUseCase, getAvailableSlotsUseCase) {
        this.createAppointmentUseCase = createAppointmentUseCase;
        this.getAppointmentUseCase = getAppointmentUseCase;
        this.listAppointmentsUseCase = listAppointmentsUseCase;
        this.cancelAppointmentUseCase = cancelAppointmentUseCase;
        this.confirmAppointmentUseCase = confirmAppointmentUseCase;
        this.getAvailableSlotsUseCase = getAvailableSlotsUseCase;
    }
    /**
     * POST /appointments - Create new appointment
     */
    async createAppointment(req, res) {
        try {
            const { patientId, timeSlot, reason, treatmentType, dentistId } = req.body;
            // Validate input
            if (!patientId || !timeSlot || !reason) {
                res.status(400).json({ error: 'Missing required fields: patientId, timeSlot, reason' });
                return;
            }
            // Create TimeSlot from DTO
            const slot = new time_slot_entity_1.TimeSlot(new Date(timeSlot.date), timeSlot.startTime, timeSlot.endTime);
            // Call use case
            const appointment = await this.createAppointmentUseCase.execute(patientId, slot, reason, treatmentType, dentistId);
            // Create response DTO
            const responseDTO = this.mapToResponseDTO(appointment);
            res.status(201).json({
                message: 'Appointment created successfully',
                appointment: responseDTO,
            });
        }
        catch (error) {
            console.error('Create appointment error:', error);
            res.status(400).json({ error: error.message || 'Failed to create appointment' });
        }
    }
    /**
     * GET /appointments/:id - Get appointment by ID
     */
    async getAppointment(req, res) {
        try {
            const { id } = req.params;
            const appointment = await this.getAppointmentUseCase.execute(id);
            const responseDTO = this.mapToResponseDTO(appointment);
            res.status(200).json(responseDTO);
        }
        catch (error) {
            console.error('Get appointment error:', error);
            res.status(404).json({ error: error.message || 'Appointment not found' });
        }
    }
    /**
     * GET /appointments - List appointments with filters
     */
    async listAppointments(req, res) {
        try {
            const { patientId, dentistId, status, fromDate, toDate } = req.query;
            const filters = {};
            if (patientId)
                filters.patientId = patientId;
            if (dentistId)
                filters.dentistId = dentistId;
            if (status)
                filters.status = status;
            if (fromDate)
                filters.fromDate = new Date(fromDate);
            if (toDate)
                filters.toDate = new Date(toDate);
            const appointments = await this.listAppointmentsUseCase.execute(filters);
            const responseDTOs = appointments.map((apt) => this.mapToResponseDTO(apt));
            res.status(200).json({
                count: responseDTOs.length,
                appointments: responseDTOs,
            });
        }
        catch (error) {
            console.error('List appointments error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    /**
     * POST /appointments/:id/confirm - Confirm appointment
     */
    async confirmAppointment(req, res) {
        try {
            const { id } = req.params;
            const { dentistId } = req.body;
            const appointment = await this.confirmAppointmentUseCase.execute(id, dentistId);
            const responseDTO = this.mapToResponseDTO(appointment);
            res.status(200).json({
                message: 'Appointment confirmed successfully',
                appointment: responseDTO,
            });
        }
        catch (error) {
            console.error('Confirm appointment error:', error);
            res.status(400).json({ error: error.message || 'Failed to confirm appointment' });
        }
    }
    /**
     * DELETE /appointments/:id - Cancel appointment
     */
    async cancelAppointment(req, res) {
        try {
            const { id } = req.params;
            const appointment = await this.cancelAppointmentUseCase.execute(id);
            const responseDTO = this.mapToResponseDTO(appointment);
            res.status(200).json({
                message: 'Appointment cancelled successfully',
                appointment: responseDTO,
            });
        }
        catch (error) {
            console.error('Cancel appointment error:', error);
            res.status(400).json({ error: error.message || 'Failed to cancel appointment' });
        }
    }
    /**
     * GET /appointments/available-slots?date=YYYY-MM-DD&dentistId=id - Get available time slots
     */
    async getAvailableSlots(req, res) {
        try {
            const { date, dentistId } = req.query;
            if (!date) {
                res.status(400).json({ error: 'Missing required query param: date (YYYY-MM-DD)' });
                return;
            }
            const slots = await this.getAvailableSlotsUseCase.execute(new Date(date), dentistId);
            const slotDTOs = slots.map((slot) => new appointment_1.TimeSlotDTO(slot.getDate().toISOString().split('T')[0], slot.getStartTime(), slot.getEndTime()));
            res.status(200).json({
                date,
                count: slotDTOs.length,
                availableSlots: slotDTOs,
            });
        }
        catch (error) {
            console.error('Get available slots error:', error);
            res.status(400).json({ error: error.message || 'Failed to get available slots' });
        }
    }
    /**
     * Map Appointment entity to ResponseDTO
     */
    mapToResponseDTO(appointment) {
        const timeSlot = appointment.getTimeSlot();
        return new appointment_1.AppointmentResponseDTO(appointment.getId(), appointment.getPatientId(), new appointment_1.TimeSlotDTO(timeSlot.getDate().toISOString().split('T')[0], timeSlot.getStartTime(), timeSlot.getEndTime()), appointment.getStatus(), appointment.getReason(), appointment.getCreatedAt(), appointment.getUpdatedAt(), appointment.getDentistId(), appointment.getNotes(), appointment.getTreatmentType(), appointment.getConfirmedAt(), appointment.getCancelledAt(), appointment.getCompletedAt());
    }
}
exports.AppointmentController = AppointmentController;
